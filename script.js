// next should take us to the next page, back should take us to the previous page
// When on the initial page, back shouldn't be visible, and next should float: left;
// When on the 4th page, next should spell out "Confirm" instead of "Next step"

const prevBtns = document.querySelectorAll(".back");
const nextBtns = document.querySelectorAll(".next");
const formStep = document.querySelectorAll(".form-step");
const navBtns = document.getElementById("buttons");
const numCircle = document.querySelectorAll(".numberCircle");

let currFormStep=0;
// console.log(`The currFormStep is: ${currFormStep}`)

// Function to handle the loading of the Finishing up page
function handleFinishingUpPage(){
    if(planType){
        document.getElementById("plan-type-calc").innerHTML = planType+" ";
        document.getElementById("plan-type-calc").innerHTML += ("("+planDuration+")");
        document.getElementById("total-charge").innerHTML = "+$"+planRate+"/mo";

        // For displaying the add-ons bought
        for (let i = 0; i < addons.length; i++) {
            // const displayElement = document.getElementById("add-on-desc-disp");
        
            // Append add-on name
            document.querySelector(".add-on-name-disp").innerHTML += addons[i]+"<br>";
            
            // Append add-on rate
            document.querySelector(".add-on-rate-disp").innerHTML += addonRates[i] + "<br>";
        
            // Add extra spacing between add-ons
            // displayElement.innerHTML += "<br>";
        }
        

        document.getElementById("total-num").innerHTML = "+$"+totalCharge+"/mo";
    }
}

// Function to color the circles in the navbar
function colorCircles(){
    numCircle.forEach((cir,index) => {
        cir.style.backgroundColor = index == currFormStep ? "hsl(206, 94%, 87%)" : "inherit";
        cir.style.color = index == currFormStep ? "hsl(213, 96%, 18%)" : "white";
    });
}

// Function to update the Form step and change the button stylings
function updateFormStep(){
    formStep.forEach(formSteps => {
        formSteps.classList.contains("active") && formSteps.classList.remove("active");
    });
    
    formStep[currFormStep].classList.add("active");
    console.log(`(Update Fn) | The currFormStep is: ${currFormStep}`);

    colorCircles();

    switch(currFormStep)
    {
        case 0:
            prevBtns.forEach(btn => {
                btn.style.display="none";
            });
            break;
        case 3:
            handleFinishingUpPage();
            nextBtns.forEach(btn => {
                btn.textContent="Confirm";
            });
            break;
        case 4:
            navBtns.style.display="none";
            break;
        default:
            navBtns.style.display="flex";
            prevBtns.forEach(btn => {
                btn.style.display="inline";
            });
            nextBtns.forEach(btn => {
                btn.textContent="Next Step";
            });
    }
}

// Readies the first page
window.addEventListener("load", function(){

        if(currFormStep===0){
        prevBtns.forEach(btn => {
            btn.style.display="none";
        });

        colorCircles();        
    }
})

// For programming the functioning of the next buttons
nextBtns.forEach(btn => {
    btn.addEventListener("click", function(){
        if(currFormStep < 4)
        {
            // console.log(`(MF) | The currFormStep is: ${currFormStep}`)
            currFormStep+=1;
            updateFormStep();
            console.log("Next button successfully executed its function");
        }
    })
})

// For programming the functioning of the back buttons
prevBtns.forEach(btn => {
    btn.addEventListener("click", function(){
        if(currFormStep >= 1)
        {
            currFormStep-=1;
            updateFormStep();
            // console.log(`(MF) | The currFormStep is: ${currFormStep}`)
            console.log("Back button successfully executed its function");
        }
    })
})

// ********************************************************************************

// Snippet to populate variables with the plan type and rate
let planType, planRate, totalCharge=0;
document.querySelectorAll(".btn-plan-type").forEach(btn => {
    btn.addEventListener("click", function(event){
        
        event.preventDefault();
        planType = btn.querySelector(".plan-type-text").textContent;
        planRate = parseInt(btn.querySelector(".plan-rate").textContent.replace(/\$/g,''), 10);
        totalCharge=planRate;
        console.log(`1. The total charge now is: ${totalCharge}`);
        console.log(`The plan type selected is: ${planType} and it's rate is ${planRate}`);
        btn.style.backgroundColor = "#ccc";
    });
});


// Setting and changing the Plan Duration using a slider
const durationSwitch = document.getElementById("durationSwitch");
let planDuration;

function updatePlanDuration(){

    planDuration = durationSwitch.checked ? "Yearly" : "Monthly";
    console.log(`The plan duration is: ${planDuration}`);
}
durationSwitch.addEventListener("change", updatePlanDuration);

updatePlanDuration();


// Setting the Add-ons
let addons = [], addonRates = [];

document.querySelectorAll(".check").forEach(function(checkBox){
    
    checkBox.addEventListener("change", function(){

        // Finds the closest add-on class, so as to select it when the user clicks
        // the area of the box.
        // The user should be able to click anywhere in the box and select the checkbox.
        const addoncontainer = this.closest(".add-on");
        const addonRateText = addoncontainer.querySelector(".add-on-rate").textContent;
        const addonRateValue = parseFloat(addonRateText.replace(/\$/g, ''));

        // To program the checked condition
        if(this.checked){
            addons.push(addoncontainer.querySelector(".add-on-name").textContent);
            addonRates.push(addoncontainer.querySelector(".add-on-rate").textContent);
            
            if(addons.slice(-1) == "Online service")
                totalCharge += 1;
            else
                totalCharge += 2;
            console.log(`2. The total charge now is: ${totalCharge}`);
        }
        else{   // To program the condition where the user might un-click a checkbox
            
            const index = addons.indexOf(addoncontainer.querySelector(".add-on-name").textContent);

            if(index !== -1){
                addons.splice(index,1);
                addonRates.splice(index,1);
                totalCharge -= addonRateValue;
            }
        }
    });
});