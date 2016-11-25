#!/usr/bin/env bash

function exitWithError() {
    echo
    echo "The build was interrupeted!"
    read -p "Press [Enter] key to continue..."
    exit 1
}

set -e -o pipefail

OLD_PATH=`pwd`
PROJECT_PATH="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd $PROJECT_PATH || { exitWithError; }

SRC_ROOT=${PROJECT_PATH}/src
DEST_ROOT=${PROJECT_PATH}/build
TSC=${PROJECT_PATH}/node_modules/.bin/tsc
ROLLUP=${PROJECT_PATH}/node_modules/.bin/rollup
UGLIFYJS=${PROJECT_PATH}/node_modules/.bin/uglifyjs
VERSION=`node -e "console.log(require('./package.json').version)"`
PACKAGE=`node -e "console.log(require('./package.json').name)"`

echo
echo "Building package \"${PACKAGE}\" version ${VERSION}:"

echo
echo "Cleaning ${DEST_ROOT}..."
rm -rf ${DEST_ROOT}/* || { exitWithError; }

mkdir -p ${DEST_ROOT} || { exitWithError; }

BUNDLES=(umd
    amd
    cjs
    iife)

SRC_PATH=${SRC_ROOT}
DEST_PATH=${DEST_ROOT}/${PACKAGE}
BUNDLE_PATH=${DEST_PATH}/bundles
TSCONFIG=$SRC_PATH/tsconfig.build.json
FIXMAPS=${PROJECT_PATH}/build-helpers/fix-maps.js
ROLLUPCONFIG=$SRC_PATH/rollup.build.js

echo
echo "Transpiling to ${DEST_PATH}/src..."
echo "Config: ${TSCONFIG}"
$TSC -p $TSCONFIG --outDir $DEST_PATH/src || { exitWithError; }

echo
echo "Rolling up to ${BUNDLE_PATH}..."
echo "Config: ${ROLLUPCONFIG}"
cd $SRC_PATH || { exitWithError; }
$ROLLUP -c $ROLLUPCONFIG || { exitWithError; }

for BUNDLE in ${BUNDLES[@]}
do
    INDEX=index.${BUNDLE}
    BUNDLE_TARGET=${BUNDLE_PATH}/${INDEX}
    echo
    echo "Minifying from ${BUNDLE_TARGET}.js..."
    $UGLIFYJS -c -m --screw-ie8 --keep-fnames --comments --in-source-map ${BUNDLE_TARGET}.js.map --source-map ${BUNDLE_TARGET}.min.js.map --output ${BUNDLE_TARGET}.min.js --source-map-url ${INDEX}.min.js.map ${BUNDLE_TARGET}.js || { exitWithError; }

    # fixing sourcemaps
    SOURCEMAPS=(${BUNDLE_TARGET}.js.map
        ${BUNDLE_TARGET}.min.js.map)
    echo
    for MAP in ${SOURCEMAPS[@]}
    do
        echo "Fixing sources paths in ${MAP}..."
        node $FIXMAPS $MAP || { exitWithError; }
    done
done

# Processing package.json
PACKAGE_JSON=`cat ${SRC_PATH}/package.json` || { exitWithError; }
PACKAGE_JSON="${PACKAGE_JSON//"0.0.0-PLACEHOLDER"/"$VERSION"}" || { exitWithError; }
printf "$PACKAGE_JSON" > ${DEST_PATH}/package.json || { exitWithError; }

cd $OLD_PATH
echo
echo "Done!"