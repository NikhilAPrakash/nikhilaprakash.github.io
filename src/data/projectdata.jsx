import bayesianMLP from '../assets/bayesianMLP.png';
import weatherDoc from "../docs/Benchmarking_ML_Models_for_Boston_s_Weekly_Weather.pdf";
import buddha_3d from '../assets/buddha_3d.png';
import cacheimg from '../assets/cache.png';
import cacheDoc from '../docs/ProjectReport_ComputerArchitectureEECCE7352.pdf';
import iplDoc from "../docs/IPL_Score_Predictor_EECE5644.pdf";
import iplPlot from '../assets/ipl.png';
import lidar from '../assets/lidar_mapping.png';
import lidarDoc from "../docs/ProjectReport_ComparitiveAnalysis_EECE5554.pdf";
import ETC from '../docs/ETC.pdf';
import etc from '../assets/etc.png';
import bluebikes from '../assets/bluebikes.png';
import bluebikes_arch from '../assets/blubikes_arch.png';

const projects = [
  {
    id: "bluebikes",
    title: "BlueBikes Demand & Bias Monitoring",
    role: "MLOps / Data Science",
    summary:
      "End-to-end pipeline to forecast bike demand and monitor geographic bias using Airflow and DVC.",
    bullets: [
      "Designed and deployed an end-to-end MLOps pipeline for Bluebikes hourly demand prediction using Airflow, Docker, and GCP.",
      "Implemented automated model training, bias mitigation, promotion, drift monitoring, and retraining triggers.",
      "Built production-grade monitoring with Evidently AI, versioned baselines, alerting, and model lifecycle governance."
    ],
    tech: ["Python", "Pandas", "LightGBM", "Airflow", "DVC", "Docker"],
    github: "https://github.com/PranavViswanathan/Optimizing-Bluebikes-Operations-with-Machine-Learning-Based-Demand-Prediction?tab=readme-ov-file",
    demo: "",
    wip: false,
    details: {
      overview:
        "A full-stack MLOps system for predicting Bluebikes bike-share demand in Boston, covering the complete machine learning lifecycle from data ingestion to production monitoring and automated retraining. The project emphasizes real-world deployment concerns including feature drift, prediction drift, performance decay, bias mitigation, model versioning, and operational alerting. The pipeline is designed to mirror industry-grade ML systems with reproducibility, observability, and reliability as first-class goals.",
      highlights: [
        "Built a modular Airflow-based training pipeline integrating Bluebikes trip data, engineered temporal features, lag features, and external weather signals to predict hourly ride demand.",
        "Implemented automated model selection and evaluation, logging RMSE, MAE, R², and bias metrics, followed by conditional promotion of bias-mitigated models to production.",
        "Designed a training-data-based baseline generation system for monitoring, ensuring drift comparisons are grounded in the distribution the model actually learned from.",
        "Developed a comprehensive drift monitoring DAG using Evidently AI, detecting data drift, prediction drift, and performance degradation with configurable severity thresholds.",
        "Implemented versioned baselines, HTML and JSON monitoring reports, and persistent monitoring artifacts for auditability and reproducibility.",
        "Integrated real-time alerting via Discord for warning and critical drift events, with cooldown logic and safeguards to prevent excessive retraining.",
        "Closed the MLOps loop by automatically triggering retraining DAGs when critical drift or performance decay is detected, enforcing production-grade lifecycle management.",
        "Deployed the system in Dockerized environments with clear separation of training, monitoring, and production concerns, following cloud-ready MLOps design principles."
      ],
      images: [
        // bluebikesImg
        bluebikes,
        bluebikes_arch,
      ]
    }
  },
  // {
  //   id: "lins",
  //   title: "LINS-Inspired LiDAR-Inertial SLAM",
  //   role: "Robotics / State Estimation",
  //   summary:
  //     "Re-implementation of LINS for pose estimation using LiDAR and IMU data in a Gazebo setup.",
  //   bullets: [
  //     "Implemented sensor fusion pipeline and pose graph optimization.",
  //     "Evaluated on KITTI sequences with trajectory error metrics.",
  //     "Integrated with ROS2 and visualized trajectories in RViz."
  //   ],
  //   tech: ["C++", "ROS2", "Eigen", "GTSAM"],
  //   github: "https://github.com/…",
  //   demo: "",
  //   details: {
  //     overview:
  //       "A research-style implementation of LiDAR-Inertial state estimation, closely following the LINS paper.",
  //     highlights: [
  //       "Implemented IMU pre-integration and LiDAR frame registration, feeding into a factor graph solved with GTSAM.",
  //       "Benchmarked against ground-truth trajectories on KITTI, computing ATE/RPE metrics.",
  //       "Set up a Gazebo world and ROS2 node graph to replay sensor data and visualize SLAM output in RViz."
  //     ],
  //     images: [
  //       // linsImg
  //     ]
  //   }
  // },
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
  github: "https://github.com/msalmancodes/probabilistic-weather-models.git",
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
},
{
  id: "multiview",
  title: "Multiview 3D Reconstruction",
  role: "Computer Vision / 3D Geometry",
  summary:
    "Reconstructed 3D structure from multiple calibrated images using OpenCV feature extraction and GTSAM optimization.",
  bullets: [
    "Enhanced clarity of 24 images using CLAHE for improved feature detection with SIFT.",
    "Estimated camera poses and refined reconstruction accuracy via bundle adjustment in GTSAM.",
    "Achieved 51.77% improvement in initial estimate accuracy using Levenberg–Marquardt optimization."
  ],
  tech: ["Python", "OpenCV", "SIFT", "GTSAM", "NumPy", "Matplotlib"],
  github: "https://github.com/NikhilAPrakash/Multiview-3D-Reconstruction.git",   // add your link here
  demo: "",                        // optional
  docs: "",                        // optional documentation link
  details: {
    overview:
      "A full multiview 3D reconstruction pipeline that processes a set of 24 images, extracts features, estimates camera poses, and jointly optimizes the 3D point cloud through bundle adjustment. The workflow uses CLAHE to enhance feature visibility and applies SIFT for robust keypoint detection and matching across views.",
    highlights: [
      "Applied CLAHE in OpenCV to improve contrast and feature sharpness across all input images.",
      "Extracted and matched features using SIFT, enabling reliable triangulation of 3D points.",
      "Computed camera extrinsics and refined the entire reconstruction through bundle adjustment in GTSAM.",
      "Utilized the Levenberg–Marquardt algorithm to significantly improve optimization accuracy, resulting in a 51.77% enhancement over initial estimates.",
      "Visualized the reconstructed 3D point cloud and optimization results using Matplotlib."
    ],
    images: [
      // You can add: import mv3dImg from "../assets/multiview_plot.png";
      // mv3dImg
      buddha_3d,
    ]
  }
},
{
  id: "cache-timing",
  title: "Cache Timing Analysis on x86 and ARM",
  role: "Systems / Computer Architecture",
  summary:
    "Measured and compared L1, L2, L3, and SDRAM access latencies across x86 and AArch64 architectures using low-level timing mechanisms.",
  bullets: [
    "Benchmarked cache and memory latencies using RDTSC/RDTSCP on x86 and PMU cycle counters on ARM.",
    "Implemented controlled memory access patterns to isolate L1, L2, L3, and SDRAM hit times.",
    "Analyzed architectural differences (associativity, cache size, prefetching) impacting latency behavior."
  ],
  tech: ["C", "x86 Assembly", "ARMv8 Assembly", "Linux", "PMU", "RDTSC"],
  github: "https://github.com/NikhilAPrakash/Cache-Timing-Analysis.git", // optional
  demo: "",                      // optional
  docs: cacheDoc,                      // optional PDF link (e.g., imported)
  details: {
    overview:
      "A cross-platform study investigating cache hierarchy performance on x86 and AArch64 machines. The project systematically measures L1, L2, L3, and SDRAM access latencies using architectural timing instructions while controlling cache state through flushing, alignment, and tailored memory-access patterns.",
    highlights: [
      "Developed separate C programs for x86 and ARM, using inline assembly to access low-level timers such as RDTSC/RDTSCP on x86 and PMU counters via mrs/msr on ARM.",
      "Aligned memory buffers and controlled cache placement to ensure deterministic L1, L2, L3, and SDRAM accesses.",
      "Measured x86 cache hits: ~39–58 cycles (L1), ~46–66 cycles (L2), ~77 cycles (L3), and ~180 cycles for SDRAM.",
      "Measured ARM Cortex-A57 behavior: ~49 cycles for L1 hits, ~77 cycles for L2 hits, and ~450 cycles for SDRAM fetches.",
      "Generated latency distributions from 1M samples per test, revealing architectural differences in associativity, line size, and cache organization.",
      "Provided insights for optimizing memory-bound workloads across heterogeneous CPU architectures through understanding cache behavior."
    ],
    images: [
      // To add: import cachePlot from "../assets/cache_timing.png";
      // cachePlot
      cacheimg
    ]
  }
},
{
  id: "ipl",
  title: "IPL Score Predictor",
  role: "Machine Learning / Regression Modeling",
  summary:
    "Built a predictive model to estimate first-innings IPL scores using feature-engineered match, player, and contextual data.",
  bullets: [
    "Processed and integrated 500+ IPL match samples from Kaggle with extensive feature cleaning.",
    "Engineered match context features including overs, wickets, last-5-overs performance, venue, and toss effects.",
    "Benchmarked Linear Regression, Ridge, SVR, Decision Trees, XGBoost, and AdaBoost to identify the best model."
  ],
  tech: ["Python", "Pandas", "NumPy", "scikit-learn", "XGBoost", "Matplotlib", "Seaborn"],
  github: "", // optional
  demo: "",                      // optional
  docs: iplDoc,                      // link to PDF if you want
  details: {
    overview:
      "A supervised regression project predicting first-innings IPL cricket scores using a combination of player data, match context, engineered statistics, and venue factors. The study evaluates multiple regression algorithms and compares their predictive performance using MAE, MSE, RMSE, and learning-curve behavior.",
    highlights: [
      "Cleaned and merged match-level, player-level, and contextual datasets (overs, wickets, weather, venue, toss) sourced from Kaggle.",
      "Applied one-hot encoding, column pruning, train–test splitting, and outlier handling to prepare over 500 matches of structured data.",
      "Engineered high-impact predictive features including runs/wickets in the last 5 overs, cumulative overs progression, and power-play outcomes.",
      "Generated correlation heatmaps (page 7) showing strong links between overs (0.88), last-5-overs runs (0.59), and final score. ",
      "Trained multiple regressors: Linear, Ridge, Decision Tree, SVR, AdaBoost, and XGBoost; evaluated learning curves and error distributions (pages 10–23). ",
      "Linear Regression achieved the best generalization with lowest MAE (12.11) and RMSE (15.84), outperforming more complex models while avoiding overfitting.",
      "Produced final score-range predictions (page 25) closely matching real match outcomes—for example, predicting 189–204 for an actual score of 200/9."
    ],
    images: [
      // Example (upload your plots for me to convert to imports):
      // import iplPlot from "../assets/ipl_prediction.png";
      iplPlot
    ]
  }
},
{
  id: "lidar-mapping",
  title: "Comparative Analysis of LiDAR-Based Mapping",
  role: "Robotics / SLAM",
  summary:
    "Evaluated LeGO-LOAM and LIO-SAM for LiDAR-based 3D mapping across KITTI and Gazebo datasets, analyzing trajectory accuracy, drift behavior, and overall SLAM robustness.",
  bullets: [
    "Compared LiDAR-only SLAM (LeGO-LOAM) with LiDAR-Inertial fusion (LIO-SAM) in both real and simulated environments.",
    "Evaluated mapping accuracy using ATE and RPE metrics against ground-truth trajectories.",
    "Implemented and tested both systems on KITTI data and a Gazebo indoor mapping setup."
  ],
  tech: ["ROS", "C++", "Python", "LiDAR", "IMU", "Gazebo", "KITTI", "SLAM"],
  github: "",  // optional
  demo: "",                       // optional
  docs: lidarDoc,                       // optional PDF link
  details: {
    overview:
      "A comprehensive evaluation of two state-of-the-art LiDAR-based SLAM algorithms—LeGO-LOAM and LIO-SAM—performed across the KITTI dataset and controlled Gazebo simulations. The study investigates mapping accuracy, IMU drift effects, algorithmic robustness, and trajectory reconstruction quality using quantitative SLAM metrics.",
    highlights: [
      "Implemented both LeGO-LOAM and LIO-SAM following their full algorithmic pipelines, including feature extraction, odometry estimation, mapping, and factor-graph optimization (pages 1–3). ",
      "Used the KITTI dataset for real-world outdoor evaluation, observing significant IMU drift in LIO-SAM and more stable LiDAR-only estimation from LeGO-LOAM (page 5, Fig. 3). ",
      "Built a custom Gazebo indoor environment with a LiDAR + IMU robot model executing circular, square, and free-form trajectories for mapping analysis (page 6, Fig. 4). ",
      "Computed Absolute Trajectory Error (ATE) and Root Path Error (RPE) to quantify deviations from ground truth (page 6). ",
      "LeGO-LOAM showed lower errors on KITTI (ATE: 65.24 m, RPE: 0.64 m) compared to LIO-SAM (ATE: 248.17 m, RPE: 4.24 m), highlighting drift challenges in IMU integration (page 7, Table 1). ",
      "On simulated Gazebo trajectories, LIO-SAM exhibited moderate performance with higher errors for complex paths (page 8, Table 2). ",
      "Generated side-by-side visualizations of ground-truth vs SLAM-estimated trajectories across circular, square, and environment-wide paths (pages 7–8, Figs. 6–7). ",
      "Concluded that robust SLAM mapping requires improved IMU fusion, loop-closure reliability, and environment-dependent tuning (page 8)."
    ],
    images: [
      // Add images after uploading them:
      // import legoVsLioPlot from "../assets/mapping_comparison.png";
      // legoVsLioPlot
      lidar
    ]
  }
},
{
  id: "event-triggered-control",
  title: "Periodic Switched & Mixed Event-Triggered Control (PSET & PCMSET)",
  role: "Control Systems / Networked Control Systems",
  summary:
    "Proposed two novel event-triggered control schemes (PSET, PCMSET) to reduce transmissions in Networked Control Systems while maintaining stability.",
  bullets: [
    "Designed PSET and PCMSET by combining periodic sampling with switched event-triggered control.",
    "Reduced transmissions by 30–40% compared to existing CET, PET, SET, and MSET schemes.",
    "Validated performance on second-order and fourth-order systems, including an inverted pendulum."
  ],
  tech: ["MATLAB", "Control Theory", "Networked Control Systems", "State-Space Models"],
  github: "",  // optional
  demo: "",                       // optional
  docs: ETC,                       // optional PDF link
  details: {
    overview:
      "A control-theoretic study introducing two novel event-triggered schemes—Periodic Switched Event-Triggered Control (PSET) and Periodic Continuous Mixed Switched Event-Triggered Control (PCMSET). These methods aim to minimize the number of transmissions in a Networked Control System (NCS) without compromising stability. By fusing periodic sampling and switched event-triggering concepts, the proposed schemes prevent Zeno behavior, increase inter-event times, and outperform existing CET, PET, SET, and MSET strategies.",
    highlights: [
      "Reviewed classical and modern event-triggering schemes including CET, PET, SET, DSET, and MSET, and analyzed their triggering conditions & limitations (pages 1–3). ",
      "Designed **PSET**, which periodically checks the triggering condition and applies a fixed waiting time after each transmission, preventing Zeno behavior. Illustrated via flow diagram and line diagram on page 3 (Figures 1–2).",
      "Developed **PCMSET**, a hybrid scheme combining TTC, STC, and PET with periodic transitions, reducing unnecessary samples while preserving stability. Visualized via diagrams on page 3 (Figures 4–5). ",
      "Demonstrated that PET reduces transmissions vs CET (38 vs 97 transmissions) for the benchmark second-order system (Figures 6–7, page 4). ",
      "Showed **PSET reduces transmissions by 34%** compared to SET (37 vs 56), with both states converging to zero (Table II, Figure 9, page 4). }",
      "Demonstrated **PCMSET outperforms MSET**, reducing transmissions by 32% (17 vs 25) for p = 0.5 (Table III, Figures 10–11, page 5). ",
      "Validated PCMSET stability on a fourth-order inverted-pendulum system, achieving full-state convergence within 20 seconds (Figure 12, page 5). ",
      "Computed the Ideal Operating Period (IOP): optimal p = 0.6 for PSET and p = 0.5 for PCMSET, yielding the lowest number of transmissions (Tables IV–V, page 6).",
      "Concluded that the proposed schemes achieve ~30–40% fewer transmissions than classical schemes while guaranteeing system stability."
    ],
    images: [
      // Example usage:
      // import psetDiagram from "../assets/pset_flow.png";
      // import pcmsetDiagram from "../assets/pcmset_line.png";
      // psetDiagram, pcmsetDiagram
      etc,
    ]
  }
},

  // add more projects…
];

export default projects;