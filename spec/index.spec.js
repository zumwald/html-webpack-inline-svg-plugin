/* eslint-env jasmine */
var path = require('path')
var fs = require('fs')
var chalk = require('chalk')
var cheerio = require('cheerio')
var webpack = require('webpack')
var rm = require('rimraf')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var HtmlWebpackInlineSVGPlugin = require('../')

var OUTPUT_DIR = path.join(__dirname, '../dist')

rm(OUTPUT_DIR, (err) => {

    if (err) console.log(chalk.red(err))

})

describe('HtmlWebpackInlineSVGPlugin', function () {

    beforeEach(function (done) {

        webpack({
            entry: path.join(__dirname, 'fixtures', 'entry.js'),
            output: {
                path: OUTPUT_DIR,
            },
            plugins: [
                new HtmlWebpackPlugin({
                    template: path.join(__dirname, 'fixtures', 'index.html'),
                }),
                new HtmlWebpackInlineSVGPlugin(),
            ],
        }, function (err) {

            expect(err).toBeFalsy()

            done()

        })

    })

    it('should not inline imgs without inline attribute', function (done) {

        var htmlFile = path.resolve(OUTPUT_DIR, 'index.html')

        fs.readFile(htmlFile, 'utf8', function (er, data) {

            expect(er).toBeFalsy()

            var $ = cheerio.load(data)

            expect($('img.leave-me').length).toBe(1)

            done()

        })

    })

    it('should inline imgs with inline attribute', function (done) {

        var htmlFile = path.resolve(OUTPUT_DIR, 'index.html')

        fs.readFile(htmlFile, 'utf8', function (er, data) {

            expect(er).toBeFalsy()

            var $ = cheerio.load(data)

            expect($('svg#inline-me').length).toBe(1)

            done()

        })

    })

    it('should remove img tags with inline attribute', function (done) {

        var htmlFile = path.resolve(OUTPUT_DIR, 'index.html')

        fs.readFile(htmlFile, 'utf8', function (er, data) {

            expect(er).toBeFalsy()

            var $ = cheerio.load(data)

            expect($('img[inline]').length).toBe(0)

            done()

        })

    })

})
