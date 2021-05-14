### Problem: I'm getting ResolutionFailure 
>pipenv.exceptions.ResolutionFailure]: Warning: Your dependencies could not be resolved. You likely have a mismatch in your sub-dependencies.
>  First try clearing your dependency cache with $ pipenv lock --clear, then try the original command again.
> Alternatively, you can use $ pipenv install --skip-lock to bypass this mechanism, then run $ pipenv graph to inspect the situation.
>  Hint: try $ pipenv lock --pre if it is a pre-release dependency.
> ERROR: Could not find a version that matches
#### solution
This is a common problem, and IT'S OK. Just run `pipenv lock --pre --clear`. It should update your Pipfile.lock and do the trick.

### Problem: I don't see `(TauClubs)` suffix at my command line prompt at the ternminal.
When I start vscode I don't see the suffix. why?

#### solution
Consider the following solutions:
1. Restart the **terminal** (not vscode). If this works, it's because the first terminal is never opening the virtual environment. This is a vscode's team known issue and we unfortunately can't do anything about it untill they release a fix :/
2. If 1 didn't work, try reinstall the python section in the Readme.md. Somehthing might be wrong with how pipenv was installed
3. Check your version. We work with python V3.9.4 preferable with a 64-bit build. Only use 32-bit if you own a 32-bit machine.

### Problem: I can't run the server. Why?

#### solution
There might be plenty of reasons. Here are some possible solutions:
1. Dependencies aren't properly installed. run: 
2. You might have problem with access to mongodb. You need to ad you ip address to our mongo's firewall whitelist.
3. 
pymongo.errors.ConfigurationError: The DNS operation timed out after 21.200684547424316 seconds
