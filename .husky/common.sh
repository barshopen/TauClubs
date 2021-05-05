PIP=.env/Scripts/pip.exe
REQUIREMENTS=requirements.txt
SHOULDNT_CHANGE='package.json yarn.lock'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'

NC='\033[0m' # No Color
HUSKY='[HUSKY] '
command_exists () {
  command -v "$1" >/dev/null 2>&1
}

# Workaround for Windows 10, Git Bash and Yarn
if command_exists winpty && test -t 1; then
  exec < /dev/tty
fi