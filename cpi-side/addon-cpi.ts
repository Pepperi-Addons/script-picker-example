import '@pepperi-addons/cpi-node'

export async function load(configuration: any) {
    console.log('cpi side client action test works!');
    pepperi.events.intercept('TSAButtonPressed', {}, async (data, next, main) => {
        // const htmlMessage =
        //     '<!DOCTYPE html>\n<html>\n<head>\n<style>\n/* This style sets the width of all images to 100%: */\nimg {\n  width: 100%;\n}\n</style>\n</head>\n<body>\n\n<img src="https://cdn3.vectorstock.com/i/thumb-large/18/02/are-you-ready-label-sticker-vector-20041802.jpg"  style="width:256px;height:256px;">\n\n</body>\n</html>\n\n';
        // const res = await data.client?.showDialog({
        //     title: 'My dialog',
        //     content: htmlMessage,
        //     actions: [
        //         {
        //             title: 'One',
        //             value: '1',
        //         },
        //         {
        //             title: 'Two',
        //             value: '2',
        //         },
        //         {
        //             title: 'Three',
        //             value: '3',
        //         },
        //         {
        //             title: 'Four',
        //             value: '4',
        //         },
        //     ],
        // });
        // await data.client?.alert('pressed: ', res);
        // try {
        //     const location = await data.client?.captureGeoLocation({ accuracy: 'High', maxWaitTime: 3000 });
        //     console.log('location@: ');
        //     console.log('location: ', location);
        //     if (location?.success) {
        //         const mapHtmlOld = `<iframe src = \"https://maps.google.com/maps?q=${location?.latitude},${location?.longitude}&hl=es;z=14&amp;output=embed\"></iframe>`;
        //         const mapHtml = `<div style=\"width: 100%\"><iframe width=\"100%\" height=\"600\" frameborder=\"0\" scrolling=\"no\" marginheight=\"0\" marginwidth=\"0\" src=\"https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=${location?.latitude},${location?.longitude}&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed\"><a href=\"https://www.gps.ie/sport-gps/\">fitness tracker</a></iframe></div>`;

        //         await data.client?.showDialog({
        //             title: 'My Map',
        //             content: mapHtml,
        //             actions: [
        //                 {
        //                     title: 'Ok',
        //                     value: '1',
        //                 },
        //             ],
        //         });
        //         await data.client?.alert(
        //             'location: ',
        //             `${location?.latitude}, ${location?.longitude}, ${location?.accuracy}`,
        //         );
        //     } else {
        //         await data.client?.alert('location: ', 'failed: ' + location?.reason);
        //     }

        //     const scan = await data.client?.scanBarcode();
        //     if (scan?.sucsess) {
        //         await data.client?.alert('barcode: ', scan.barcode as string);
        //     } else {
        //         await data.client?.alert('barcode failed: ', scan?.reason as string);
        //     }
        //     console.log('after alert');
        // } catch (error) {
        //     await data.client?.alert('location: ', 'failed: ' + error);
        // }
        // console.log('data: ', data);
        // if (data['data'] == '1') {
        //     console.log('about to navigate 1');
        //     await data.client?.navigateTo(data['navData']);
        // } else if (data['data'] == '2') {
        //     console.log('about to navigate 2');
        //     await data.client?.navigateTo(data['navData']);
        // } else {
        //     // for general activity
        //     await data.client?.navigateTo({ url: 'bibi_king' });
        // }
        // test https://pepperi.atlassian.net/browse/DI-19876
        // let dialogOptions = {
        //     // optional
        //     title: "Client",
    
        //     content: "Testing",
    
        //     actions: [
        //       {
        //         title: "Ok",
    
        //         // value can be anything
        //         // string or number or even a function
        //         value: "x",
        //       },
        //       {
        //         title: "Cancel",
    
        //         value: () => {},
        //       },
        //     ],
        //   };
        //   const hudOptions = {
        //     // HUD's message
        //     message: "Waiting....", // optional (default value is '')
    
        //     // adds a button with text to the HUD
        //     closeMessage: "Press to close", // optional - (default is '' and the botton is hidden)
    
        //     //display the HUD after the delay time (the block runs in the meantime)
        //     delay: 1.3, //optional - (default value is 0.5)
    
        //     // block of code that will run in background while the HUD is showing.
        //     block: async (updateMessage) => {
        //       await data.client?.showDialog(dialogOptions);
        //       const geoRes = await data.client?.captureGeoLocation({
        //         accuracy: "High",
        //         maxWaitTime: 500,
        //       });
        //       await data.client?.confirm("GeoData", JSON.stringify(geoRes));
        //       for (let i = 0; i < 100; i++) {
        //         await new Promise((resolve) => setTimeout(resolve, 100));
        //         // you can update the HUD message while the HUD is showing
        //         updateMessage(`In progress ${i}%`);
        //       }
        //     },
        //   };
        //   const res = await data.client?.showHUD(hudOptions);
        //   if (res?.canceled) {
        //     console.log("HUD canceled");
        //     // do stuff..
        //     // if HUD canceled res.result will be a Promise of the block result.
        //     console.log("blockResult :>> ", await res.result);
        //   } else {
        //     console.log("HUD finished with result :>> ", res?.result);
        //   }
        // test https://pepperi.atlassian.net/browse/DI-19877
        let dialogOptions = {
            // optional
            title: "Client",
    
            content: "Testing",
    
            actions: [
              {
                title: "Ok",
    
                // value can be anything
                // string or number or even a function
                value: "x",
              },
              {
                title: "Cancel",
    
                value: () => {},
              },
            ],
          };
          const hudOptions = {
            // HUD's message
            message: "Waiting....", // optional (default value is '')
    
            // adds a button with text to the HUD
            closeMessage: "Press to close", // optional - (default is '' and the botton is hidden)
    
            //display the HUD after the delay time (the block runs in the meantime)
            delay: 0.1, //optional - (default value is 0.5)
    
            // block of code that will run in background while the HUD is showing.
            block: async (updateMessage) => {
              // do stuff that takes a long time that needs a HUD
              // for example:
              // You can call any client action you want like this.
              await data.client?.alert("Alert", "we are ready...");
              const barcode = await data.client?.scanBarcode();
              dialogOptions.content = JSON.stringify(barcode);
              await data.client?.showDialog(dialogOptions);
              const geoRes = await data.client?.captureGeoLocation({
                accuracy: "High",
                maxWaitTime: 500,
              });
              await data.client?.confirm("GeoData", JSON.stringify(geoRes));
              for (let i = 0; i < 100; i++) {
                await new Promise((resolve) => setTimeout(resolve, 100));
                // you can update the HUD message while the HUD is showing
                console.log(`In progress ${i}%`);
                updateMessage(`In progress ${i}%`);
              }
            },
          };
          const res = await data.client?.showHUD(hudOptions);
          if (res?.canceled) {
            console.log("HUD canceled");
            // do stuff..
            // if HUD canceled res.result will be a Promise of the block result.
            console.log("blockResult :>> ", await res.result);
          } else {
            console.log("HUD finished with result :>> ", res?.result);
          }
        // test geo location
        // const geoRes = await data.client?.captureGeoLocation({
        //     accuracy: "High",
        //     maxWaitTime: 500,
        //   });
        await next(main);
    });
}