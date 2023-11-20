const solve = async () => {
    // Taking out the input values from the user
    var marks = document.getElementById("marks").value;
    var subject = document.getElementById("subject").value;
    var easy = document.getElementById("easy").value;
    var medium = document.getElementById("medium").value;
    var hard = document.getElementById("hard").value;

    // Calling the API
    var url = "http://localhost:5500/questions";

    try {
        var response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.ok) {
            var data = await response.json();
            filterQuestions(marks, data, subject, easy, medium, hard);
        } else {
            console.error(`HTTP error! Status: ${response.status}`);
        }
    } 
    catch (error) {
        console.error("Error during fetch:", error);
    }
};

// filterQuestions function filters the objects from the dataset on the basis 
// of the marks and diffuculty levels given by the user
const filterQuestions = (marks, data, subject, easy, medium, hard) => {
    // Converting easy, medium and hard marks to the corresponding questions
    var NoOfEasyMarks = easy / 100 * marks;
    var NoOfMediumMarks = medium / 100 * marks;
    var NoOfHardMarks = hard / 100 * marks;
    var NoOfEasyQuestions = (NoOfEasyMarks / 5)
    var NoOfMediumQuestions = (NoOfMediumMarks / 10)
    var NoOfHardQuestions = (NoOfHardMarks / 20)
    var NoofMarksRemaining = Math.floor(NoOfEasyMarks % 5 + NoOfMediumMarks % 10 + NoOfHardMarks % 20)
    
    // Handling the remaining marks
    if (NoofMarksRemaining > 0) {
        while (NoofMarksRemaining != 0) {
            if (NoofMarksRemaining >= 5 && NoofMarksRemaining < 10) {
                NoofMarksRemaining -= 5;
                NoOfEasyQuestions++;
            } else if (NoofMarksRemaining >= 10 && NoofMarksRemaining < 20) {
                NoofMarksRemaining -= 10;
                NoOfMediumQuestions++;
            } else {
                NoofMarksRemaining -= 20;
                NoOfHardQuestions++;
            }
        }
    }
    
    // Converting actual values to floor so that sum of the selected marks does not 
    //exceed the actual marks (in short handling decimal values)
    NoOfEasyQuestions = Math.floor(NoOfEasyQuestions)
    NoOfMediumQuestions = Math.floor(NoOfMediumQuestions)
    NoOfHardQuestions = Math.floor(NoOfHardQuestions)

    // Printing corresponding array of objects(questions list) in the console on the basis
    // of the subject given by the user
    if (subject === "Physics") {
            const arr = data[0].Questions.filter((question) => {
                if (NoOfEasyQuestions > 0 && question.Marks === 5) {
                    NoOfEasyQuestions--;
                    return true;
                } else if (NoOfMediumQuestions > 0 && question.Marks === 10) {
                    NoOfMediumQuestions--;
                    return true;
                } else if (NoOfHardQuestions > 0 && question.Marks === 20) {
                    NoOfHardQuestions--;
                    return true;
                }
                return false;
            });
            
            console.log(arr);
        } else if (subject === "Chemistry") {
            const arr = data[1].Questions.filter((question) => {
                if (NoOfEasyQuestions > 0 && question.Marks === 5) {
                    NoOfEasyQuestions--;
                    return true;
                } else if (NoOfMediumQuestions > 0 && question.Marks === 10) {
                    NoOfMediumQuestions--;
                    return true;
                } else if (NoOfHardQuestions > 0 && question.Marks === 20) {
                    NoOfHardQuestions--;
                    return true;
                }
                return false;
            });
            
            console.log(arr);
        } else {
            const arr = data[2].Questions.filter((question) => {
                if (NoOfEasyQuestions > 0 && question.Marks === 5) {
                    NoOfEasyQuestions--;
                    return true;
                } else if (NoOfMediumQuestions > 0 && question.Marks === 10) {
                    NoOfMediumQuestions--;
                    return true;
                } else if (NoOfHardQuestions > 0 && question.Marks === 20) {
                    NoOfHardQuestions--;
                    return true;
                }
                return false;
            });
            
        console.log(arr);
    }
};

