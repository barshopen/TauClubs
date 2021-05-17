SHOULDNT_CHANGE='package.json yarn.lock'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'

NC='\033[0m' # No Color
HUSKY='[HUSKY] '
command_exists () {
  command -v "$1" >/dev/null 2>&1
}

# Workaround for Windows 10, Git Bash and Yarn
if command_exists winpty && test -t 1; then
  exec < /dev/tty
fi

function autoCommitChanges() {
    printf "${HUSKY} ${GREEN} Saving $1 \n ${NC}";
    changes=`git diff --name-only HEAD $1 | wc -l`;
    if [[ $changes -ne 0 ]]; then
        git add $1
        git commit -m "AUTOMATIC-COMMIT: $2 FILES: $1"
    fi
}

function undoChanges() {
    printf "${HUSKY} ${GREEN} Undoing changes in $1 \n ${NC}";
    git fetch; git checkout origin/master -- $1
    autoCommitChanges $1 UNDO
}

function donothing(){ :; }