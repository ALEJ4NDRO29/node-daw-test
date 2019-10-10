exports.config = {
    framework: 'jasmine',
    //seleniumAddress: 'http://localhost:4444/wd/hub',
    baseUrl: 'http://localhost:8080/',
    specs: ['test.js'],
    capabilities: {
        browserName: 'chrome'
    }
};