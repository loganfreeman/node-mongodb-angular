git filter-branch --force --commit-filter '
    if [ "$GIT_AUTHOR_NAME" = "$1" ];
    then
            skip_commit "$@";
    else
            git commit-tree "$@";
    fi' HEAD