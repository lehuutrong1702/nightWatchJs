
const emailInput = `//android.webkit.WebView[@text="Taskbox"]/android.view.View/android.view.View/android.view.View[1]/android.view.View[1]/android.widget.EditText`;
const passwordInput= `//android.webkit.WebView[@text="Taskbox"]/android.view.View/android.view.View/android.view.View[1]/android.view.View[2]/android.widget.EditText`
 const email = "lehuutrong141@gmail.com";
 const password = "0823988687"
 const createButton = `//android.view.View[@text="Create"]/android.view.View`;
 const createSpaceButton = `//android.view.View[@text="Create Space"]`;
 const finishButton =`//android.widget.Button[@text="Create"]`
 const spaceTitleText = `//android.widget.EditText`
 const viewSpaceButton =`//android.view.View[@text="Spaces"]`
 const searchButton =`//android.widget.TextView[@text=""]`
 const searchText = `//android.widget.EditText`
 const submitSearch = `//android.widget.Button[@text="Search"]`
 const currentDate = new Date();
 const isoTimestamp = currentDate.toISOString();
 testData = [
    { 
        testcaseName: 'Space - TC01 Create space successfully with information valid',
        data: {
            spaceName: "SpaceNameTest001001" ,
            assert: async function (app) {
                app.waitForElementVisible(searchButton,3000);
                app.click(searchButton)

                    .setValue(searchText,this.spaceName) 
                    
                         
                    const expected = `//android.widget.TextView[@text="${this.spaceName}"]`
               
                     app.waitForElementVisible(expected,2000)
                    app.assert.visible(expected);
            }
        }
    },
    {
        testcaseName: 'Space - TC03 Create space successfully with Special character',
        data: {
            spaceName: "test$Space###@@&$$$" , 
            assert: async function (app) {
                app.waitForElementVisible(searchButton,3000);
                    app.click(searchButton)

                    .setValue(searchText,this.spaceName) 
                    
                 const expected = `//android.widget.TextView[@text="${this.spaceName}"]`

                     app.waitForElementVisible(expected,2000)
                    app.assert.visible(expected);
            }
        }
    },
    {
        testcaseName: 'Space - TC02 Create space unsuccessfully with empty field name',
        data: {
            spaceName: "",
            assert: async function (app) {
               
                    
                    const expected =`//android.widget.TextView[@text="This field is required"]`

                    app.waitForElementVisible(expected,3000)
                    app.assert.visible(expected);
            }
        }
    }
]


describe("create space requirement", function(){


    before (function(app) {
        console.log("create space before");
     

    }) ;

    
    testData.forEach (element => { 
        testCreateSpace(element)
      })
    
    
    

    function testCreateSpace(data) {
      
        it(data.testcaseName , async function(app) { 
            app
            .useXpath()
            .setValue(emailInput,email)
            .setValue(passwordInput,password)
            .click(`//android.widget.Button[@text="Let's go"]`)
    
            app
                .useXpath()
                .click(viewSpaceButton)
                
                .click(createButton)
                // .setPermission('storage', 'granted')
                .setValue(spaceTitleText,data.data.spaceName)
                
                .click(finishButton) 
    
        
    
             data.data.assert(app);

          await  app.end();
                
    
        });
    }


   

} )