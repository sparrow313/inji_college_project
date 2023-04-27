import React, { useState } from "react";
import "./LandingPage.css";
import pic from "./Assets/info.jpg";
import download from "downloadjs";

const LandingPage = () => {
  const [age, setAge] = useState("");
  const [sex, setSex] = useState("");
  const [activityLevel, setActivityLevel] = useState("sedentary");
  const [dailyCalories, setDailyCalories] = useState("");
  const [recommendedCalories, setRecommendedCalories] = useState("");
  const [showImage, setShowImage] = useState(0);

  const calorieRanges = {
    male: {
      2: [1000, 1400],
      5: [1200, 1800],
      9: [1400, 2200],
      14: [1800, 2400],
      19: [2400, 3000],
      31: [2200, 3000],
      50: [2200, 3000],
      60: [2000, 2600],
    },
    female: {
      2: [1000, 1400],
      5: [1200, 1800],
      9: [1400, 2200],
      14: [1800, 2400],
      19: [2000, 2400],
      31: [1800, 2200],
      50: [1800, 2200],
      60: [1600, 2000],
    },
  };

  const getActivityMultiplier = (activityLevel) => {
    switch (activityLevel) {
      case "sedentary":
        return 1.2;
      case "moderatelyActive":
        return 1.55;
      case "active":
        return 1.9;
      default:
        return 1;
    }
  };

  const calculateRecommendedCalories = (sex, age, activityLevel) => {
    const calorieRange = calorieRanges[sex.toLowerCase()];
    const ageKeys = Object.keys(calorieRange);
    let lowerAgeKey = ageKeys[0];
    let upperAgeKey = ageKeys[ageKeys.length - 1];
    for (let i = 0; i < ageKeys.length - 1; i++) {
      if (ageKeys[i] <= age && ageKeys[i + 1] > age) {
        lowerAgeKey = ageKeys[i];
        upperAgeKey = ageKeys[i + 1];
        break;
      }
    }
    const lowerCalorieRange = calorieRange[lowerAgeKey];
    const upperCalorieRange = calorieRange[upperAgeKey];
    const activityMultiplier = getActivityMultiplier(activityLevel);
    let lowerCalories = lowerCalorieRange[0] * activityMultiplier;
    let upperCalories = upperCalorieRange[1] * activityMultiplier;
    if (age >= parseInt(lowerAgeKey) && age <= parseInt(upperAgeKey)) {
      lowerCalories = lowerCalorieRange[0] * activityMultiplier;
      upperCalories = upperCalorieRange[1] * activityMultiplier;
    } else {
      const averageCalories =
        ((lowerCalorieRange[1] + upperCalorieRange[0]) / 2) *
        activityMultiplier;
      lowerCalories = Math.round(averageCalories * 0.8);
      upperCalories = Math.round(averageCalories * 1.2);
    }
    return `${lowerCalories}-${upperCalories}`;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (age && sex && activityLevel && dailyCalories) {
      const recommendedCalories = calculateRecommendedCalories(
        sex,
        parseInt(age),
        activityLevel
      );
      setRecommendedCalories(recommendedCalories);
    }
    setShowImage(1);
  };

  const handleDownload = () => {
    download(pic);
  };

  return (
    <div className="landing-page">
      <div className="landing-page__form">
        <h2>Enter your information: 📃</h2>
        <form onSubmit={handleSubmit}>
          <div className="input_container1">
            <div className="landing-page__form-group">
              <label htmlFor="age">Age: 📅</label>
              <input
                type="Number"
                id="age"
                value={age}
                placeholder="Enter age"
                onChange={(e) => setAge(e.target.value)}
              />
            </div>
            <div className="landing-page__form-group">
              <label htmlFor="sex">Sex: 🚹 || 🚺</label>
              <select
                id="sex"
                value={sex}
                onChange={(e) => setSex(e.target.value)}
              >
                <option value="">Select Sex</option>
                <option value="male">Male 🚹</option>
                <option value="female">Female 🚺</option>
              </select>
            </div>
          </div>
          <div className="input_container1">
            <div className="landing-page__form-group">
              <label htmlFor="sex">Level of Activity: 🏃‍♀️</label>
              <select
                id="sex"
                value={activityLevel}
                onChange={(e) => setActivityLevel(e.target.value)}
              >
                <option value="">How active are you?</option>
                <option value="active">Active 🏃‍♂️</option>
                <option value="moderatae">Moderately active 🚶‍♀️</option>
                <option value="sedentary">sedentary 🛌</option>
              </select>
            </div>
            <div className="landing-page__form-group">
              <label htmlFor="calories">Daily Calories: 🍔</label>
              <input
                type="number"
                id="calories"
                value={dailyCalories}
                placeholder="Enter calorie count"
                onChange={(e) => setDailyCalories(e.target.value)}
              />
            </div>
          </div>
          <button type="submit" onClick={handleSubmit}>
            Submit
          </button>
        </form>
        {age && sex && activityLevel && dailyCalories && showImage === 1 ? (
          <div>
            Your caloric range is{" "}
            <span style={{ fontWeight: "bold" }}>{recommendedCalories}</span>{" "}
            calories{" "}
            <p style={{ fontFamily: "monospace", fontWeight: "bold" }}>
              Below is a caloric chart that you can use to prep your meals 🍚
            </p>
          </div>
        ) : (
          ""
        )}
        {age && sex && activityLevel && dailyCalories && showImage === 1 ? (
          <div className="download">
            <div className="image_container">
              <img src={pic} className="image" alt="calorie chart" />
            </div>
            <div className="button_container">
              <button className="download_btn" onClick={handleDownload}>
                Download
              </button>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>

      <div className="landing-page__footer">
        <p>Project created by Injamul Haque</p>
      </div>
    </div>
  );
};

export default LandingPage;
