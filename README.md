# Freshworks ↔️ Glitch connector
---
- Creates a proxy to connect Freshworks app running on Glitch to their respective product. 
- Since the FDK runs on Glitch side, all you need to have is : `fwgl` installed & the Glitch app for preview ✨
- Any number of participants can navigate through the source code like they would in their own editor. 
- If you are feeling adventurous, you can remix the app and add make your own additions too. 

### How to install:

```sh
npm i fwgl -g
```

### Steps:

1. Have `fwgl` installed on your machine
2. Note down the Glitch app URL. It has to be in this format `https://xxx.glitch.me`.Here xxx is the Glitch app name. You can easily access it over here:

<img src='https://i.imgur.com/I9QXNxD.png' width='500'/>

> Note: For presenters, ensure that your attendees know the user and password of the Glitch app (that you set in the .env file) if they are willing to tryout the app remotely. Ensure to change it after the demo. As a general rule of thumb, do not hardcode any sensitive information in a Glitch app. Point 3 is only relevant if you are Remixing the app or if you are a presenter, else you can skip it.
 
3. Ensure that the `.env` file in your Glitch app **workspace**  has the following environment variables filled-in with proper values. 
 - The values that you enter in `FW_GLITCH_USER` and `FW_GLITCH_PASSWORD` act as basic auth to protect certain endpoints in the Glitch app. This can be any value that you provide. You need to note this down for providing the same in the `fwgl` command line.  
 - `FDK_ARGS` represents arguments that are passed to the FDK. Ex: If you want to skip coverage you can use `'--skip-coverage'` and if you want to open an ngrok tunnel within Glitch for testing webhooks, you can add `--tunnel` to the arguments. Anything provided there gets appended to FDK command while running the app.
 

 ```sh
FW_GLITCH_USER=dummy
FW_GLITCH_PASSWORD=dummy
# FDK Arguments
FDK_ARGS='--skip-coverage'
# Leave this as such.
INSEC=true 
```

4. Now that we have noted enough details from the Glitch app, let us run the connector. Go to your terminal and type `fwgl`. Enter the details that you have noted down in the previous steps

 <img src='https://i.imgur.com/5iBMjmP.png' width='600' />

 Upon sucessful connection, you will notice that the proxy has been created 🎉

5. You can switch to developer mode in the respective Freshworks products based on the [instructions in the documentation](https://developers.freshdesk.com/v2/docs/quick-start/#test_your_app) to test the app!

6. Since the proxy is established. You can also test the app as you normally would as if it were a local setup.
 - Installation pages at http://localhost:10001/custom_configs
 - Events simulator at http://localhost:10001/web/test
 ---
### Additional notes:

- In order to access the FDK, click on the `Tools` menu at the bottom of the Glitch app and choose the `Terminal` option. This will open a live terminal. 

- Any app that is created should be under **workspace** directory. The contents of this directory can be modified as per your wish. You can use `fdk create` or `fdk generate` and so on. By default, terminal starts with **workspace** directory set as the current working directory.
 
 
