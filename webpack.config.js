var Encore = require('@symfony/webpack-encore');

Encore
    .setOutputPath('public/build/')
    .setPublicPath('/build')
    .cleanupOutputBeforeBuild()
    .enableSourceMaps(!Encore.isProduction())
    .enableReactPreset()
    .addEntry('js/app', './assets/js/app.js')
    .configureBabel(function(config) {
        config.presets.push('stage-1');
    })
    // .enableVersioning(Encore.isProduction())
    // .addEntry('js/app', './assets/js/app.js')
    // .addStyleEntry('css/app', './assets/css/app.scss')
    // .enableSassLoader()
    // .autoProvidejQuery()
;

module.exports = Encore.getWebpackConfig();
