[![Buildt test](https://github.com/raunakgurud09/hashnode-publish/actions/workflows/test.yml/badge.svg)](https://github.com/raunakgurud09/hashnode-publish/actions/workflows/test.yml)

# hashnode-publish

This action checks-out your repository under `$GITHUB_WORKSPACE`, so your workflow can publish your md file to hashnode on push.


# What's new

Please refer to the [release page](https://github.com/raunakgurud09/hashnode-publish/releases/latest) for the latest release notes.

# Usage

<!-- start usage -->
```yaml
- name: Hashnode publish
  uses: raunakgurud09/hashnode-publish@v0.0.1
  with:
    # The new title for the blog you publish
    # Required! - The value is requied 
    title: "New blog title"

    # The path of the blog you want to post
    # Option? - Defult value for file is "Post/**/*.md"
    file: "Posts/**/*.md"

    # Get your hashnode key from [hashnode]()
    # Set your key on env in actions as HASHNODE_KEY with value from the hashnode
    # Required! - The value is requied 
    hashnode_key: ${{secret.HASHNODE_KEY}}
```
<!-- end usage -->

# License

The scripts and documentation in this project are released under the [MIT License](LICENSE)
