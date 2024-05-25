# Flask app example using Poetry and pyenv

This is a guide and an example of setting up a Flask project with pyenv as
manager for your Python versions and Poetry as manager of your Python
dependencies in the project.

The repository also sets up some formatter

This guide is made for Ubuntu or WSL2 running Ubuntu.

## Install [pyenv](https://github.com/pyenv/pyenv)

This describes installation with the
[pyenv automatic installer](https://github.com/pyenv/pyenv?tab=readme-ov-file#automatic-installer).

You can run the installer they provide with the following command:

```
curl https://pyenv.run | bash
```

Now you should have pyenv installed in `~/.pyenv`. Next we add some lines to
`~/.bashrc` to initialize it:

```
echo '' >> ~/.bashrc
echo 'export PYENV_ROOT="$HOME/.pyenv"' >> ~/.bashrc
echo 'export PATH="$PYENV_ROOT/bin:$PATH"' >> ~/.bashrc
echo 'eval "$(pyenv init -)"' >> ~/.bashrc
```

You need to restart your shell for the changes to take affect. Then you should
be able to run `pyenv --version`.

Next step is to make sure that you have all the dependencies required for building
Python installed (see [suggested build environment](https://github.com/pyenv/pyenv/wiki#suggested-build-environment)).

```
sudo apt update; sudo apt install build-essential libssl-dev zlib1g-dev \
libbz2-dev libreadline-dev libsqlite3-dev curl git \
libncursesw5-dev xz-utils tk-dev libxml2-dev libxmlsec1-dev libffi-dev liblzma-dev
```

### Uninstalling

The program can be uninstalled by running following command:

```
rm -rf $(pyenv root)
```

You should also remove the lines we added to `~/.bashrc`.

## Install [Poetry](https://python-poetry.org/)

This describes installation with the
[Poetry official installer](https://python-poetry.org/docs/#installing-with-the-official-installer)

```
curl -sSL https://install.python-poetry.org | python3 -
```

Now Poetry should be installed in `~/.local/share/pypoetry` and you should
be able to run `poetry --version`.

### Uninstalling

The program can be uninstalled by running following command:

```
curl -sSL https://install.python-poetry.org | python3 - --uninstall
```

## Using the development environment

This section describes how to setup and start using the development environment.

### Initialize virtual environment

This section describes how we initialize the development environment which is
done mainly just for your editor to use the correct Python version, formatting
and linting.

The actual development server is ran inside a docker container.

#### Create virtual environment

We can tell Poetry to create a [virtual environment for Python](https://docs.python.org/3/library/venv.html) 
and use Python version defined in `.python-version`:

```
poetry env use $(cat .python-version)

```

Now you will have a virtual environment where we can install the dependencies without
cluttering the main Python installation directory.


#### Install dependencies

To install the dependencies defined in `pyproject.toml` inside the created virtual
environment we can run the `install` command:

```
poetry install
```

Running the `install` command will use the dependency versions from `poetry.lock`
file which whould be committed to the repository. The lock file ensures everyone
gets the same versions of the dependencies. If it does not exist, Poetry creates
it based on the [version constraints](https://python-poetry.org/docs/dependency-specification/#version-constraints)
used in `pyproject.toml`.

#### Using virtual environment

Activation makes the virtual environment the default Python interpreter for the
duration of a shell session.  To activate the virtual environment we can run following:

**VSCode will activate it for each terminal you open when correct extensions are installed!**

```
poetry shell
```

To deactivate it we can run:

```
deactivate
```

### Start development environment

The actual web server is running within a docker container.

To start the Flask application along with its dependencies you can run:

```
docker compose up --watch
```

This will start redis and the backend container built from `Dockerfile`. The
watch argument will make it run using `docker compose watch` which will automatically
copy changed files to the container and rebuild it each time dependencies in
`poetry.lock` change.


### Developing with Visual Studio Code

It is **strongly** recommended to install the following extensions:

- [Python extension](https://marketplace.visualstudio.com/items?itemName=ms-python.vscode-pylance)
- [Black Formatter extension](https://marketplace.visualstudio.com/items?itemName=ms-python.black-formatter)
- [Flake8 extension](https://marketplace.visualstudio.com/items?itemName=ms-python.flake8)
- [isort extension](https://marketplace.visualstudio.com/items?itemName=ms-python.isort)

Now you should ensure that the interpreter that VSCode is using is the one in the virtual environment created
by Poetry. You can do this from the command palette **F1 -> Python: Select Interpreter**. Check that the
selected interpreter matches the path displayed by `poetry env info`.

Once the correct interpreter is selected VSCode should also use the virtual environment in every new terminal
you are opening.

Add following to your VSCode `settings.json`:

```json
"[python]": {
    // Set formatter to black with python files
    "editor.defaultFormatter": "ms-python.black-formatter",
    // Uncomment following to enable formatting on save
    // "editor.formatOnSave": true
}
// Make isort play nicely with black
"isort.args":["--profile", "black"]
```

## Project setup

This section describes how to setup a brand new Flask project with pyenv and Poetry.

The repository has already been setup like this, but the documentation is here
if you wish to do it from scratch.

### Install and setup Python 

We install the Python version we want to use:

```
pyenv install 3.12.3
```

The different Python version you install get installed to `~/.pyenv/versions/`.

Then we set the python version for the project with pyenv:

```
pyenv local 3.12.3
```

This will create a `.python-version` file in your current directory which contains the Python version.

### Initialize Poetry and Flask

Now we can initialize the Poetry project which basically means creating `pyproject.toml` file.
Running the following command will create the file:

```
poetry init -n
```

We can now add Flask to the dependencies:

```
poetry add Flask
```

The `pyproject.toml` will now contain the Flask dependency:

```
[tool.poetry.dependencies]
python = "^3.10"
Flask = "^3.0.3"
```

After installing Flask an `app` folder was created with very simple hello world app in `__init__.py`.
Having the `__init__.py` makes the `app` folder a module and allows us to run `flask run` without
arguments to start the development server.

### Install Flake8 linter

Linters help catch possible errors before they happen. Flake8 has many plugins that
can 

Flake can be installed by adding it as a development dependency:

```
poetry add --group dev flake8
```

Flake8 can be configured in `.flake8` file at your projects root directory.
See [their documentation for more information](https://flake8.pycqa.org/en/latest/user/configuration.html).

See [awesome-flak8-repo](https://github.com/DmytroLitvinov/awesome-flake8-extensions)
for a list of nice flake8 plugins. Here are some installed in this repository:

Enforce the type hints with the `flake8-annotations`:
```
poetry add --group dev flake8-annotations
```

Enforce PEP-8 naming conventions with `pep8-naming`:
```
poetry add --group dev pep8-naming
```

Enforce PEP-8 naming conventions with `pep8-naming`:
```
poetry add --group dev pep8-naming
```

Static code analysis for detecting security issues with `dlint`:
```
poetry add --group dev dlint
```

### Install black formatter

Formatter enforces an uniform coding style across the developers.

Black can be installed by adding it as a developmen dependency:

```
poetry add --group dev black
```

Black formatter uses some sensible and does not need configuration, but if you wish to configure
something then please
[add configuration to pyproject.toml](https://black.readthedocs.io/en/stable/usage_and_configuration/the_basics.html#configuration-via-a-file).

However to work well with flake8 we need to disable some rules that concern formatting from
flake8 (see [black documentation](https://black.readthedocs.io/en/stable/guides/using_black_with_other_tools.html#flake8)).

The documentation recommends installing [Bugbear plugin for flake8](https://github.com/PyCQA/flake8-bugbear):

```
poetry add --group dev flake8-bugbear
```

Bugbear finds likely bugs and design problems in your program.

Then we need to add following configuration to `.flake8`:

```
[flake8]
max-line-length = 80
extend-select = B950
extend-ignore = E203,E501,E701
```

You can also enforce black formatting options with `flake8-black` plugin for `flake8`:

```
poetry add --group dev flake8-black
```

### Install isort import formatter

[isort](https://pycqa.github.io/isort/index.html) is a Python utility / library to
sort imports alphabetically, and automatically separated into sections and by type.

With Poetry you can install it with:

```
poetry add --group dev isort
```

For isort to work nice with black formatter add following in `pyproject.toml`:

```
[tool.isort]
profile = "black"
```

You can enforce sorted imports with flake8 plugin `flake8-isort`:

```
poetry add --group dev flake8-isort
```

### Install bandit security linter

Bandit is a tool designed to find common security issues in Python code

It can be installed with:

```
poetry add --group dev bandit
```

You can enforce bandit security linting with `flake8-bandit`:

```
poetry add --group dev flake8-bandit
```
