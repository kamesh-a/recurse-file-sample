/**
 * Recursing through files and creating wallpapers
 * into a single folder.
 */

const klaw = require('klaw');
const through2 = require('through2');
const fs = require('fs-extra');

const {
    join,
    extname,
    basename
} = require('path');

const sourcePath = join(process.cwd(), 'sourceFolder');
const destinationPath = join(process.cwd(), 'destinationFolder');

/**
 * Excludes directory, files which are not png|jpg
 */
const excludeDirFilter = through2.obj(function (item, _, next) {
    if (!item.stats.isDirectory() && /\.(png|jpg)$/.test(item.path)) {
        // data chunks are queued before streaming into pipe.
        this.push(item);
    }
    // queued data is pushed in the pipe-line.
    next();
});

/**
 * Copies files from source to destinationPath
 * @param {*} src 
 * @param {*} dest 
 */
async function copyFile(src, dest) {
    try {
        await fs.copy(src, dest, {
            overwrite: true
        });
    } catch (error) {
        console.log(`file move error`, error);
    }
}

/**
 * Main function to start the program to flattern and copy files.
 * @param {*} sourcePath 
 * @param {*} destinationPath 
 */
function moveImageFiles(sourcePath, destinationPath) {
    console.log(`SourcePath: ${sourcePath}, destinationPath: ${destinationPath}`);
    let fileNo = 1;
    let fileName = `zsh`;

    klaw(sourcePath)
        .pipe(excludeDirFilter)
        .on('data', async ({
            path
        }) => {
            const ext = extname(path);
            const dest = join(destinationPath, `${fileName}_${fileNo++}${ext}`);
            await copyFile(path, dest)
            console.log(`${basename(path)} --> ${basename(dest)}`);
        })
        .on('end', () => {
            console.log('Process of moving successfully')
        });
}

moveImageFiles(sourcePath, destinationPath);