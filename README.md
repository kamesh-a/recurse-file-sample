### A small snippet to copy deep folder images from source to destination

#### Use case:
    - sourceFolder
        - some-more-folder
            - few-more-deep-folder
                - images ( png | jpg )
    
    - destinationFolder
        - copies all images ( png | jpg )

#### How to use:
    - Simply copy all contents to a folder named `sourceFolder` or Point to source folder path in `index.js`

    - By default `destinationFolder` will be created in the same drive/folder automatically or you can point to some other destination inside `index.js`

#### Pre-requisite:
    - Install nodeJs and Npm

#### Installing & Running:
    ```
        1. npm run install
        2. npm run copy
    ```

    Run the above commands in windows wsl or powershell or cmd
