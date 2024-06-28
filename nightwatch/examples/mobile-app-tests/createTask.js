
var webdriverio = require('webdriverio');


describe("create space requirement", function(){
    const emailInput = `//android.webkit.WebView[@text="Taskbox"]/android.view.View/android.view.View/android.view.View[1]/android.view.View[1]/android.widget.EditText`;
    const passwordInput= `//android.webkit.WebView[@text="Taskbox"]/android.view.View/android.view.View/android.view.View[1]/android.view.View[2]/android.widget.EditText`
     const email = "lehuutrong141@gmail.com";
     const password = "0823988687"
     const createButton = `//android.view.View[@text="Create"]/android.view.View`;

     const finishButton =`//android.widget.Button[@text="Create"]`

     const createTaskButton = `//android.view.View[@text="Create Task"]`
    const taskNameText = `//android.webkit.WebView[@text="Taskbox"]/android.view.View/android.view.View/android.view.View[2]/android.view.View/android.view.View[1]/android.widget.EditText`
    const descriptionText =`//android.widget.EditText[@text="﻿
"]`
    const selectProject = `//android.view.View[@text="Select a project"]`
    const project = `//android.widget.CheckedTextView[@resource-id="android:id/text1" and @text="Newproject"]`
  
     const dateSelector = `//android.widget.Spinner`
    const setDateButton = `//android.widget.Button[@resource-id="android:id/button1"]`

    const passedDate = `//android.view.View[@content-desc="20 tháng 6 2024"]`

    const submitButton = `//android.widget.Button[@text="Create"]`

    const taskListButton =`//android.view.View[@content-desc=""]`
    const searchButton =`//android.widget.TextView[@text=""]`
    const searchText = `//android.widget.EditText`
    const repeatButton = `//android.webkit.WebView[@text="Taskbox"]/android.view.View/android.view.View/android.view.View[2]/android.view.View/android.view.View[7]/android.widget.CheckBox`
    const repeatSelector = `//android.view.View[@text="Select..."]`
    const dailyRepeatSelector = `//android.widget.CheckedTextView[@resource-id="android:id/text1" and @text="Daily"]`
    const endDateSelector = `//android.webkit.WebView[@text="Taskbox"]/android.view.View/android.view.View/android.view.View[2]/android.view.View/android.view.View[10]/android.widget.Spinner`
    const currentDate = new Date();
    const isoTimestamp = currentDate.toISOString();
     before (function(app) {
         
         console.log("create space before");
       
     }) ;
 
 

      it ('CreateTask- TC01 Create task successfully with information valid without repeat' , async function (app) {
        app
        .useXpath()
        .setValue(emailInput,email)
        .setValue(passwordInput,password)
        .click(`//android.widget.Button[@text="Let's go"]`)

          const  taskname = "ABCDEtask" + isoTimestamp
   const expectedResult =`//android.widget.TextView[@text="${taskname}"]`
        app.useXpath()
        .click(createButton)
        .click(createTaskButton)
        .setValue(taskNameText,taskname)
        .setValue(descriptionText,"description")
        .click(selectProject)
        .click(project)
        .click(dateSelector)
        .click(setDateButton)
        .click(submitButton)
        .click(taskListButton)
        .click(searchButton)
        .setValue(searchText,taskname)
        .assert.visible(expectedResult)
        app.end();
      })
      
      it('CreateTask- TC02 Create task successfully have repeat with information valid', async function (app) { 
        app
        .useXpath()
        .setValue(emailInput,email)
        .setValue(passwordInput,password)
        .click(`//android.widget.Button[@text="Let's go"]`)

         const  taskname = "TaskRepeat" + isoTimestamp
        const expectedResult =`//android.widget.TextView[@text="${taskname}"]`
         app.useXpath()
        .click(createButton)
        .click(createTaskButton)
        .setValue(taskNameText,taskname)
        .setValue(descriptionText,"description")
        .click(selectProject)
        .click(project)
        .click(dateSelector)
        .click(passedDate)
        .click(setDateButton)

        .click(repeatButton)
        .click(repeatSelector)
        .click(dailyRepeatSelector)
        .click(endDateSelector)
        .click(setDateButton) ;
     
        app.pause(2000);
        const swipeOptions = {
          left: 500,
          top: 500,
          width: 100,
          height: 500,
          percent: 3.0,
          direction: 'down',

        };
        
        await browser.execute('mobile: scrollGesture', swipeOptions);
        

         app.pause(2000);
        // appy
       app.click(submitButton)
        .click(taskListButton)
        .click(searchButton)
        .setValue(searchText,taskname)
        .assert.visible(expectedResult)
      await  app.end();
      });

      it('CreateTask- TC03 Create task unsuccessfully with information invalid without repeat', async function(app) {
        app
        .useXpath()
        .setValue(emailInput,email)
        .setValue(passwordInput,password)
        .click(`//android.widget.Button[@text="Let's go"]`)

            const expected =`//android.widget.TextView[@text="This field is required"]`
        app.useXpath()
        .click(createButton)
        .click(createTaskButton)
        .setValue(taskNameText,"")
        .setValue(descriptionText,"description")
        .click(selectProject)
        .click(project)
        .click(dateSelector)
        .click(setDateButton)
        .click(submitButton)
     
        .assert.visible(expected)
        app.end();
      })
    
 
 } )