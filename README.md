[![Build & lint](https://github.com/raunakgurud09/hashnode-publish/actions/workflows/test.yml/badge.svg)](https://github.com/raunakgurud09/hashnode-publish/actions/workflows/test.yml)
[![Build & lint](https://github.com/raunakgurud09/hashnode-publish/actions/workflows/build.yml/badge.svg)](https://github.com/raunakgurud09/hashnode-publish/actions/workflows/build.yml)

# hashnode-publish

This enables your workflow to seamlessly publish your Markdown file to Hashnode upon each push event. The only requirement is your authentication key, and the workflow ensures that a blog post is automatically published on push. This mechanism serves as a reliable backup and is designed for user-friendly functionality.

# What's new

Please refer to the [release page](https://github.com/raunakgurud09/hashnode-publish/releases/latest) for the latest release notes.

# Usage

<!-- start usage -->
```yaml
- name: Hashnode publish
  uses: raunakgurud09/hashnode-publish@v0.0.1
  with:
    # The hostUrl of the blog you want to publish on
    # make sure you have the minimum rights to publish on the hostUrl
    # Recommended to give the host 
    # Option? - The value is option no default value
    host: ""

    # The path of the blog you want to post  
    # Any related assets is recommended to be kept inside post/
    # Required? - The value is required with default value "Post/**/*.md"
    file: "post/**/*.md"

    # Get your hashnode key from [hashnode](https://hashnode.com/settings/developer)
    # Set your key on env in actions as HASHNODE_KEY with value from the hashnode
    # Required! - The value is required no default value
    hashnode_key: ${{secret.HASHNODE_KEY}}
```
<!-- end usage -->

# Example

Organize your blog content by placing it in a dedicated folder within your repository, along with any related assets residing in the same folder. Write your blog post and include the following essential metadata:

This structured metadata ensures your blog post is well-defined and can be seamlessly integrated into your workflow, providing essential information for publication.

`post/blog/example.md`

```yaml
# Required! - Title of your blog
title: Example article title

# This is a flag with a boolean value
# Will not publish the blog until it's true
# Recommended! 
publish: true

# Recommended? - The description of the blog
description: This is a demo blog with minimum content 

# Recommended! - Provide the relative imageUrl
cover_image: ./assets/blog-post-2.jpg

# Required! - Keywords or hashtags related to your blog
tags:
  - example
  - article
  - blog

# Optional? - Provide if you have published the blog before
originalArticleURL: "https://example.com/blog/example-title-blog"

# Optional? - Subtitle for the blog
subtitle: A simple test article.
---
```
```md

# Heading 1
Include miscellaneous text with a [link](https://code.visualstudio.com).

> Note: Please pay attention to the following important information.
## Serious Title

Insert relevant text throughout!
<!-- Include a relative image for the blog -->
<!-- It is advisable to maintain the assets folder in the same directory -->
![Add some pictures too](./assets/cat.jpg)
```

Create a directory named github/workflows in your repository and include a file named publish.yml. Within the publish.yml file, insert the following commands. These commands are designed to facilitate the publication of your blog post on Hashnode.

`.github/workflows/publish.yml`

```yaml

name: "Publish"

on:
  push:
    branches: ["main"]
  pull_request:
    branches: [ main ]

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      # actions/checkout is required for reading the content of your repository
      - uses: actions/checkout@v4

      # Publish to hashnode action
      - name: Hashnode publish
      # Required for ref in outputs
        id: publish_hashnode
        # action name and version recommended to use the latest version  https://github.com/marketplace/actions/hashnode-publish
        uses: raunakgurud09/hashnode-publish@v1.1

        # Options required for 
        with:
          # The hostUrl of the blog you want to publish on
          host: "levelupdevs.hashnode.dev"

          # Path of the file you want to publish.
          # Path should be inside the repo and relative path from the root of repo
          file: "post/blog/dynamic-routing-static-regeneration.md"

          # Get hashnode key from the hashnode dashboard https://hashnode.com/settings/developer
          # Set the key in actions secrets as HASHNODE_KEY
          hashnode_key: ${{secrets.HASHNODE_KEY}}
      # Output result on console with summary
      - name: Get get output
        run: echo "${{steps.publish_hashnode.outputs.result_json}} length ${{steps.publish_hashnode.outputs.result_summary}}"
```

# Issues

Report any repository related issue on [issues](https://github.com/raunakgurud09/hashnode-publish/issues)

# License

The scripts and documentation in this project are released under the [MIT License](LICENSE)
