import React, { useState } from "react";
import "./LandingPage.css";
import pic from "./Assets/info.jpg";
import download from "downloadjs";
import { FaWeight } from "react-icons/fa";
import { SiIfood } from "react-icons/si";

const LandingPage = () => {
  const [age, setAge] = useState("");
  const [sex, setSex] = useState("");
  const [activityLevel, setActivityLevel] = useState("How  active are you?");
  const [dailyCalories, setDailyCalories] = useState("");
  const [recommendedCalories, setRecommendedCalories] = useState("");
  const [showImage, setShowImage] = useState(0);
  const [name, setName] = useState("");
  const [weight, setWeight] = useState();

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
    if (age && sex && activityLevel && name && weight) {
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
      <div
        style={{
          fontSize: "50px",
          fontWeight: "bold",
          marginTop: "20px",
          marginBottom: "30px",
        }}
      >
        E<span style={{ fontStyle: "italic" }}>at</span>F
        <span style={{ fontStyle: "italic" }}>it</span> <SiIfood />
      </div>
      <div className="landing-page__form">
        <h2>Enter your information: 📃</h2>
        <form onSubmit={handleSubmit}>
          <div className="input_container1">
            <div className="landing-page__form-group">
              <label htmlFor="age">Name: 📝</label>
              <input
                type="text"
                id="age"
                value={name}
                placeholder="Enter Name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="landing-page__form-group">
              <label htmlFor="age">
                Weight: <FaWeight />
              </label>
              <input
                type="Number"
                id="age"
                value={weight}
                placeholder="Enter Weight"
                onChange={(e) => setWeight(parseInt(e.target.value))}
              />
            </div>
          </div>
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
            <div
              className="landing-page__form-group"
              style={{ marginTop: "22px" }}
            >
              <label htmlFor="sex">Activity Level: 🏃‍♀️</label>
              <select
                id="sex"
                value={activityLevel}
                onChange={(e) => setActivityLevel(e.target.value)}
              >
                <option value="">How active are you?</option>
                <option value="active">Active 🏃‍♂️</option>
                <option value="moderate">Moderately active 🚶‍♀️</option>
                <option value="sedentary">sedentary 🛌</option>
              </select>
            </div>
            <div className="landing-page__form-group">
              <label htmlFor="calories">Daily Calories: 🍔 (optional)</label>
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
        {age && sex && activityLevel && name && weight && showImage === 1 ? (
          <div style={{ marginTop: "15px" }}>
            Your caloric range is{" "}
            <span style={{ fontWeight: "bold", color: "yellow" }}>
              {recommendedCalories}
            </span>{" "}
            calories{" "}
            <p style={{ fontFamily: "monospace", fontWeight: "bold" }}>
              Below is a caloric chart that you can use to prepare your meals 🍚
            </p>
          </div>
        ) : (
          ""
        )}
        {age && sex && activityLevel && name && weight && showImage === 1 ? (
          <div className="download">
            <span id="under">➡ </span>
            <a
              href="https://res.cloudinary.com/ddimrh7vr/image/upload/v1682630576/info_aiuvug.jpg"
              target="_blank"
            >
              Click here to get your calorie chart
            </a>
          </div>
        ) : (
          ""
        )}
        {age && sex && activityLevel && name && weight && showImage === 1 ? (
          <div className="download">
            <span id="under">➡ </span>
            <a href="https://www.myfitnesspal.com" target="_blank">
              Calculate your daily calorie needs based on your{" "}
              <span style={{ marginLeft: "20px" }}>specific diet </span>
            </a>
          </div>
        ) : (
          ""
        )}
      </div>

      <div className="landing-page__footer">
        <p style={{ fontWeight: 600, fontSize: "16px", color: "black" }}>
          Project created by : <br />{" "}
          <span
            style={{ fontWeight: 700, fontSize: "20px", fontStyle: "italic" }}
          >
            <span >
              <a style={{ color: "black", textDecoration: "none" }} href="https://www.facebook.com/injamul.hq.90">Injamul Hoque</a>
            </span>{" "}
            <br />{" "}
            <span>
              <a  style={{ color: "black", textDecoration: "none" }} href="https://www.facebook.com/so.nia.79025">
                Sonia Musaddika
              </a>
            </span>
            
          </span>
          <div  style={{ fontWeight: 400, fontSize: "18px", fontStyle: "italic" }}>(Mangaldai College)</div>
        </p>
      </div>
    </div>
  );
};

export default LandingPage;
