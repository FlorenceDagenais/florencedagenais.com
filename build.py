#!/usr/bin/env python

import argparse
import shutil
import os

import yaml
from jinja2 import Environment, FileSystemLoader


class Site(object):
    def __init__(self, static_dir="static", build_dir="build",
                 template_dir="templates"):

        self.static_dir = static_dir
        self.build_dir = build_dir
        self.template_dir = template_dir

        # Overwrite the build directory.
        if os.path.isdir(self.build_dir):
            shutil.rmtree(self.build_dir)

        os.mkdir(self.build_dir)

        # Copy the static dir to the output dir.
        shutil.copytree(
            self.static_dir,
            os.path.join(self.build_dir, self.static_dir)
        )

        # Prepare the jinja2 environment.
        self.env = Environment(
            loader=FileSystemLoader(self.template_dir)
        )

    def add_page(self, filename, template, content):
        """Add a page to the website.

        Create the `filename` file in the build directory by rendering the
        template specified by `template` and by injecting the `content`.

        """
        template = self.env.get_template(template)

        with open(os.path.join(self.build_dir, filename), "wb") as f:
            f.write(template.render(content=content))


def main(yaml):
    site = Site(**yaml["configuration"])

    for page in yaml["pages"]:
        filename = page.get("filename")
        if not filename:
            raise ValueError("The `filename` field is required for page "
                             "descriptors.")

        content = page.get("content")
        if not content:
            raise ValueError("The `content` field is required for page "
                             "descriptors.")
        with open(content, "r") as f:
            content = f.read()

        template = page.get(
            "template", os.path.join("templates", "default.html")
        )

        site.add_page(filename, template, content)


def parse_args():
    parser = argparse.ArgumentParser(description="Parse the configuration file"
                                                 " and render the website.")
    parser.add_argument(
        "yaml_configuration",
        help="Path to the YAML configuration file."
    )

    args = parser.parse_args()

    # Parse the YAML file.
    with open(args.yaml_configuration) as f:
        conf = yaml.load(f)

    main(conf)


if __name__ == "__main__":
    parse_args()
