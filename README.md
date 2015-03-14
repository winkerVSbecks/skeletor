![](img/skeletor-small.png)

# Skeletor
The Sassy Skeleton

## Usage
```
bower install git@github.com:rangle/skeletor.git
```

## Development

1. Install dependencies (might have to run with `sudo`):
  - `gem install sass`
  - `gem install scss-lint`
  - `npm install`

2. Gulp tasks available:

  - `sass`: compile Sass
  - `docs`: build the documentation
  - `scss-lint`: run the SCSS linter
  - `cssstats`: generates the css statistics
  - `dev`: start a simple node server, build docs and compile Sass

3. Go to [http://localhost:3000](http://localhost:3000) for the documentation

4. Go to [http://localhost:3000/css/stats](http://localhost:3000/css/stats) for the visualization of the CSS stats


## Attribution
Skeletor is based on Dave Gamache's [Skeleton V2.0.2](www.getskeleton.com). We are big fans of Skeleton and wanted to adapt it to our preferred workflow. This required:

- Converting the CSS to Sass
- Using the [BEM syntax](http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax) style class-names
- Linting all the Sass using [scss-lint](https://github.com/causes/scss-lint)
- Adding support for `input[type="date"]`
- Adding a few more utility classes
- Mixins:
  - Use [Bourbon](http://bourbon.io) as the mixin library
  - Replace all vendor prefixes with mixins
  - Provide Grid mixins
  - Convert the button styling to a mixin
