MTW - Contributing
==================

The project is mainly based on Ionic Framework. Before contributing it is strongly suggested to go through its [documentation] (https://ionicframework.com/docs/).

## Note
This project uses `compodoc` to generate documentation for the project and `jspm` to bundle `mtw.js` file


To have a development copy of the code, clone the repository. Run the following commands in your cloned directory.

```shell
npm install -g ionic cordova jspm gulp gulp-cli
npm install
jspm install
```

**To add platform** , run
```shell
ionic platform add android
```

**To start the application**, run

```shell
ionic run android --livereload
```

**To generate docs**, run

```shell
gulp docs
```

**To build deployment copy**
```shell
ionic build android --prod
```
This will generate an apk in folder `platforms/android/build/output/apk/`

Content Script: `mtw.js`

