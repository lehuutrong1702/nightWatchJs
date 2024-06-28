
describe('Wikipedia Android app test', function() {
  before(function(app) {
      // app.click('id', 'org.wikipedia:id/fragment_onboarding_skip_button');
  });
  
  const emailInput = `//android.webkit.WebView[@text="Taskbox"]/android.view.View/android.view.View/android.view.View[1]/android.view.View[1]/android.widget.EditText`;
  const passwordInput= `//android.webkit.WebView[@text="Taskbox"]/android.view.View/android.view.View/android.view.View[1]/android.view.View[2]/android.widget.EditText`
  const errorDialog = `//android.widget.TextView[@text="No login matched that user and password combination"]`;
  const createTaskButton = `//android.view.View[@text="Create"]/android.view.View`;
  
  const requiredEmailText = `//android.webkit.WebView[@text="Taskbox"]/android.view.View/android.view.View/android.view.View[1]/android.view.View[1]/android.widget.EditText`;
  const requiredPasswordText = `//android.widget.TextView[@text="This field is required"]`;
  const invalidEmailText = `//android.widget.TextView[@text="Sorry, but that address isn't valid"]`;
  // --------- login UI-------- 

  const data = [
    {testcaseName: "Sign in - TC02 Sign In unsuccessfully with Email is empty ", email:'', password:"0823988687", visibleExpected:requiredPasswordText},

    {testcaseName: "Sign in - TC03 Sign In unsuccessfully with Password is empty", email:"lehuutrong141@gmail.com", password:'', visibleExpected:requiredPasswordText},
    
    {testcaseName: "Sign in - TC05 Sign In unsuccessfully with password invalid", email:"lehuutrong141@gmail.com", password:"123456", visibleExpected:errorDialog},
    
    {testcaseName: "Sign in - TC04 Sign In unsuccessfully with Email invalid", email:"lehuutrong14", password:"0823988687", visibleExpected:invalidEmailText},
   
    {testcaseName: "Sign in - TC01 Sign In successfully with information valid", email:"lehuutrong141@gmail.com", password:"0823988687", visibleExpected:createTaskButton},
  ];
  
  data.forEach (element => { 
    LoginTest(element)
  })


  function LoginTest(data) {
    it(data.testcaseName, async function(app) {
      app
        .useXpath()
        .click(`//android.widget.Button[@text="Let's go"]`)
        .setValue(emailInput,data.email)
        .setValue(passwordInput,data.password)
        .click(`//android.widget.Button[@text="Let's go"]`)
        // .click(emailInput) 
        // .click(`//android.webkit.WebView[@text="Taskbox"]/android.view.View/android.view.View`)
        
        .waitForElementVisible(data.visibleExpected,3000)

        .assert.visible(data.visibleExpected)
      .end();
  });
  
  }



});