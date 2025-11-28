import bayesianMLP from '../assets/bayesianMLP.png';
import weatherDoc from "../docs/Benchmarking_ML_Models_for_Boston_s_Weekly_Weather.pdf";

const projects = [
  {
    id: "bluebikes",
    title: "BlueBikes Demand & Bias Monitoring",
    role: "MLOps / Data Science",
    summary:
      "End-to-end pipeline to forecast bike demand and monitor geographic bias using Airflow and DVC.",
    bullets: [
      "Ingested multi-source data (rides, weather, census) into a reproducible pipeline.",
      "Trained gradient boosting models with hyperparameter tuning and bias evaluation.",
      "Containerized workflow with Docker and scheduled in Airflow for daily runs."
    ],
    tech: ["Python", "Pandas", "LightGBM", "Airflow", "DVC", "Docker"],
    github: "https://github.com/…",
    demo: "",
    details: {
      overview:
        "This project builds a production-style pipeline to forecast station-level demand for BlueBikes and analyze fairness across neighborhoods.",
      highlights: [
        "Designed a modular data pipeline (collection → cleaning → feature engineering → model training → reporting) orchestrated via Airflow DAGs.",
        "Used DVC to version datasets and models so experiments are reproducible and traceable.",
        "Logged experiments and metrics for multiple models, then selected the best one for deployment.",
        "Generated station-level bias reports comparing performance across demographic and geographic segments."
      ],
      images: [
        // bluebikesImg
      ]
    }
  },
  {
    id: "lins",
    title: "LINS-Inspired LiDAR-Inertial SLAM",
    role: "Robotics / State Estimation",
    summary:
      "Re-implementation of LINS for pose estimation using LiDAR and IMU data in a Gazebo setup.",
    bullets: [
      "Implemented sensor fusion pipeline and pose graph optimization.",
      "Evaluated on KITTI sequences with trajectory error metrics.",
      "Integrated with ROS2 and visualized trajectories in RViz."
    ],
    tech: ["C++", "ROS2", "Eigen", "GTSAM"],
    github: "https://github.com/…",
    demo: "",
    details: {
      overview:
        "A research-style implementation of LiDAR-Inertial state estimation, closely following the LINS paper.",
      highlights: [
        "Implemented IMU pre-integration and LiDAR frame registration, feeding into a factor graph solved with GTSAM.",
        "Benchmarked against ground-truth trajectories on KITTI, computing ATE/RPE metrics.",
        "Set up a Gazebo world and ROS2 node graph to replay sensor data and visualize SLAM output in RViz."
      ],
      images: [
        // linsImg
      ]
    }
  },
  {
  id: "weather",
  title: "Benchmarking ML Models for Boston's Weekly Weather",
  role: "Machine Learning / Predictive Modeling",
  summary:
    "Comparative study of Bayesian, probabilistic, and tree-based models for forecasting weekly precipitation in Boston using NOAA climate data.",
  bullets: [
    "Engineered seasonal + lagged weather features from NOAA’s GHCND dataset spanning 2005–2024.",
    "Benchmarked Bayesian Regression, Gaussian Processes, Bayesian Neural Networks, and Decision Trees.",
    "Evaluated RMSE, MAE, NLL, and uncertainty calibration with comprehensive model comparison."
  ],
  tech: ["Python", "PyMC3", "scikit-learn", "TensorFlow/Keras", "NumPy", "Pandas"],
  github: "https://github.com/…",
  demo: "",
  docs: weatherDoc,
  details: {
    images: [
      bayesianMLP,
    ],
    overview:
      "A full-stack applied ML study analyzing 20 years of Boston weather patterns by forecasting weekly precipitation using both probabilistic and non-probabilistic approaches. The project compares classical Bayesian methods, Gaussian Processes, uncertainty-aware neural architectures, and optimized decision trees to understand accuracy–uncertainty tradeoffs in real-world weather prediction.",
    highlights: [
      "Built a preprocessing pipeline for NOAA’s GHCND dataset: merged multi-station data, imputed temperatures, engineered weekly aggregates, and added lagged features and seasonal encodings.",
      "Developed a Gaussian Process Regression pipeline using a Constant × RBF kernel, performing grid-search CV and Bayesian optimization; analyzed under/over-smoothing effects and uncertainty behavior. ",
      "Implemented and evaluated Bayesian Regression variants with Gaussian/Gamma priors, feature-specific weights, and polynomial priors using PyMC3 + NUTS sampling; quantified posterior behavior and model breakdown with complexity. }",
      "Built uncertainty-aware neural networks: MC Dropout MLP/RNNs, Variational Bayesian MLP, and Laplace Bayesian MLP; evaluated prediction intervals, NLL, and calibration performance. ",
      "Engineered rolling-mean and rolling-std rainfall features and tuned Decision Trees via Grid Search, delivering the strongest deterministic performance (RMSE ≈ 14.65, R² = 0.41). ",
      "Conducted a comparative analysis showing that Decision Trees excel at accuracy, whereas Laplace Bayesian MLP provides the best-calibrated uncertainty estimates for risk-aware applications."
    ],
    
  }
}
  // add more projects…
];

export default projects;