import fs from 'node:fs';
import { exec } from 'node:child_process';

function run(cmd) {
    return new Promise((resolve, reject) => {
      exec(cmd, (error, stdout, stderr) => {
        if (error) return reject(error)
        if (stderr) return reject(stderr)
        resolve(stdout)
      })
    })
  }
  

const folderPath = '.';

const aFolders = await fs.promises.readdir(folderPath);

for(const sFolder of aFolders){
    const oStats = await fs.promises.lstat(sFolder);
    if(!['.git', 'node_modules'].includes(sFolder) && oStats.isDirectory()){
        console.log(await run(`R -e 'rmarkdown::render("${sFolder}/slides.Rmd", output_format = "powerpoint_presentation", output_dir = "dist/${sFolder}")'`));
        //console.log(`R -e 'rmarkdown::render("${sFolder}/slides.Rmd", output_format = "powerpoint_presentation", output_dir = "dist/${sFolder}")'`);
    }
}

