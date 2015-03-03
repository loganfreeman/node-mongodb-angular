if [ $# -eq 0 ]
  then
    echo "Usage: $0 author"
    exit 1
fi

git filter-branch --force --commit-filter '
    if [ "$GIT_AUTHOR_NAME" = "$1" ];
    then
            skip_commit "$@";
    else
            git commit-tree "$@";
    fi' HEAD