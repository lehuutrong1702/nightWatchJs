describe("create project requirement", function(){
    const emailInput = `//android.webkit.WebView[@text="Taskbox"]/android.view.View/android.view.View/android.view.View[1]/android.view.View[1]/android.widget.EditText`;
    const passwordInput= `//android.webkit.WebView[@text="Taskbox"]/android.view.View/android.view.View/android.view.View[1]/android.view.View[2]/android.widget.EditText`
   const createButton = `//android.view.View[@text="Create"]`

    const createProjectButton =`//android.view.View[@text="Create Project"]`
    const projectNameText = `//android.widget.EditText`

    const selectSpace =`//android.view.View[@text="Select a space"]`

    const dateSelector = `//android.widget.Spinner`
    const setDateButton = `//android.widget.Button[@resource-id="android:id/button1"]`

    const submitButton = `//android.widget.Button[@text="Create"]`

    const existSpaceSelector =`//android.widget.CheckedTextView[@resource-id="android:id/text1" and @text="abcde"]`

    const passedDate = `//android.view.View[@content-desc="20 tháng 6 2024"]`

    


    const projectName = "projectTest1"

    const viewProjectList = `(//android.widget.TextView[@text=""])[2]`

    const expectedResult = `//android.view.View[@text="${projectName}"]`
 
    const errorNotify = `//android.widget.TextView[@text="This field is required"]`

    const email = "lehuutrong141@gmail.com";
    const password = "0823988687"
 
     before (function(app) {
         
         console.log("create space before");
        
 
     }) ;
 
     const spaceName = "aaaaaaa"    

     testcase  = [ 

        {
            testcaseName: "Project - TC001 Create project successfully with valid information " , 
            data: {
                    projectName: "ProjectTestExample01",
                    selectSpace: 1,
                    selectDate: 1,
                    selectPassedDate: 0 ,
                    expectedResult: errorNotify,
                    assert: async function (app) {
                            app.click(viewProjectList)
                            app.assert.visible(expectedResult)
                    }
                } , 
        },
        
        {
            testcaseName: "Project - TC003 Validate project creation with the day has passed" , 
            data: {
                    projectName: "ProjectTestExampleeee003",
                    selectSpace: 1,
                    selectDate: 1,
                    selectPassedDate: 1 ,
                    expectedResult: errorNotify,
                    assert: async function (app) {
                            app.click(viewProjectList)
                            app.assert.visible(expectedResult)
                    }
                } , 
        },
        { 
            testcaseName: "Project - TC002 Validate project creation with empty project name" , 
            data: {
                    projectName: "",
                    selectSpace: 1,
                    selectDate: 1,
                    selectPassedDate: 0 ,
                    expectedResult: errorNotify,
                    assert: async function (app) {
                            app.assert.visible(errorNotify)
                    }
                } , 
        }
     ]
     testCreateProject(testcase[0]);
     testCreateProject(testcase[1]);
     testCreateProject(testcase[2]);

     function testCreateProject(data)  {
        it(data.testcaseName , async function(app) { 
            app
            .useXpath()
            .setValue(emailInput,email)
            .setValue(passwordInput,password)
            .click(`//android.widget.Button[@text="Let's go"]`)
            
            app
                .useXpath()
                    .waitForElementVisible(createButton,5000)
                   .click(createButton)
                   .click(createProjectButton)
                   .setValue(projectNameText, data.data.projectName);
                    if(data.data.selectSpace) {
                        app.click(selectSpace)
                        .click(existSpaceSelector)
                    };
                    if (data.data.selectDate) { 
                        app.click(dateSelector)
                        if (data.data.selectPassedDate) {
                            app.click(passedDate)
                        }

                         app.click(setDateButton)
                    }
                    app.click(submitButton)
                    
                   await data.data.assert(app);
                 await app.end();  
   
        });
     }
   
 
 } )