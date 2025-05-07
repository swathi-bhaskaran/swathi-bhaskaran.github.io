library(caret)

df <- read.csv("watson_healthcare_modified.csv")


###################### Performing Data pre-processing ###########################################################

# Display Data Frame
View(df)

#separating numerical columns and categorical columns from the datset

num_cols <- df[, c('Age', 'DailyRate', 'DistanceFromHome', 'HourlyRate', 
                   'MonthlyIncome', 'MonthlyRate', 'NumCompaniesWorked', 
                   'PercentSalaryHike', 'TotalWorkingYears', 
                   'TrainingTimesLastYear', 'YearsAtCompany', 'YearsInCurrentRole', 
                   'YearsSinceLastPromotion', 'YearsWithCurrManager'), drop = FALSE]

cat_cols <- df[,c('Attrition', 'BusinessTravel', 'Department',
                  'Education', 'EducationField', 'EnvironmentSatisfaction', 
                  'Gender', 'JobInvolvement', 'JobLevel',
                  'JobRole', 'JobSatisfaction', 'MaritalStatus',
                  'OverTime', 'PerformanceRating', 'RelationshipSatisfaction', 'WorkLifeBalance'),drop = FALSE]

# Univariate analysis on numerical variables
summary(num_cols)

#Univariate analysis on categorical variables

frequency_counts <- lapply(cat_cols, table)
print(frequency_counts)


######### Converting columns with Yes | No to 1 and 0 encoding ################################

# Display columns Attrition, OverTime, Over18
df[c('Attrition', 'OverTime', 'Over18')]

#Label encoding convert – Yes =1 , No = 0
# Replace the 'Attrition', 'OverTime', and 'Over18' column with integers before performing any visualizations
df$Attrition <- ifelse(df$Attrition == "Yes", 1, 0)
df$OverTime <- ifelse(df$OverTime == "Yes", 1, 0)
df$Over18 <- ifelse(df$Over18 == "Y", 1, 0)

# Display after Label Encoding
df[, c('Attrition', 'OverTime', 'Over18')]

# Check for missing data
colSums(is.na(df))


# Heat Map for missing data 
library(heatmaply)

# Convert logical missing data to numeric (0 for missing, 1 for present)
missing_data <- as.numeric(is.na(df))

# Reshape the data frame to have the same dimensions as the original data
missing_data <- matrix(missing_data, nrow = nrow(df), ncol = ncol(df))

# Plot the heatmap to show that there is no missing data
heatmap(missing_data, Rowv = NA, Colv = NA, col = "Blue", scale = "none", xlab = "", ylab = "")


######################## Attrition Details #######################################
# Display how many employees left the company
table(df$Attrition)

# Two Data Frame with employees left and stayed 
# Create two data frames: left_df for employees who left and stayed_df for employees who stayed
left_df <- df[df$Attrition == 1, ]
stayed_df <- df[df$Attrition == 0, ]

# Display left_df
print(left_df)

# Display stayed_df
print(stayed_df)

# Attrition Percentage 
# Count the number of employees who stayed and left
# It seems that we are dealing with an imbalanced dataset
# Print total number of employees
total <- nrow(df)
print(paste("Total =", total))

# Print number of employees who left the company and their percentage
left_count <- nrow(left_df)
left_percentage <- (left_count / total) * 100
print(paste("Number of employees who left the company =", left_count))
print(paste("Percentage of employees who left the company =", left_percentage, "%"))

# Print number of employees who stayed in the company and their percentage
stayed_count <- nrow(stayed_df)
stayed_percentage <- (stayed_count / total) * 100
print(paste("Number of employees who did not leave the company (stayed) =", stayed_count))
print(paste("Percentage of employees who did not leave the company (stayed) =", stayed_percentage, "%"))

# Compare the Data Frames employees left and stayed
# Summary statistics for left_df
print("Summary statistics for employees who left the company:")
print(summary(left_df))
# Summary statistics for stayed_df
print("Summary statistics for employees who stayed in the company:")
print(summary(stayed_df))


######################## Visualization plots for Attrition and Retention ##########################################

# Histogram of Numerical variables 
par(mfrow = c(2,2 ), mar=c(5, 4, 4, 2))
# Histogram for Age
hist(df$Age, main = "Distribution of Age", xlab = "Age", col = "blue")
# Histogram for DailyRate
hist(df$DailyRate, main = "Distribution of Daily Rate", xlab = "Daily Rate", col = "green")
# Histogram for HourlyRate
hist(df$HourlyRate, main = "Distribution of Hourly Rate", xlab = "Hourly Rate", col = "red")
# Histogram for MonthlyIncome
hist(df$MonthlyIncome, main = "Distribution of Monthly Income", xlab = "Monthly Income", col = "purple")
# Histogram for MonthlyRate
hist(df$MonthlyRate, main = "Distribution of Monthly Rate", xlab = "Monthly Rate", col = "orange")
# Histogram for NumCompaniesWorked
hist(df$NumCompaniesWorked, main = "Distribution of Num Companies Worked", xlab = "Num Companies Worked", col = "pink")
# Histogram for PercentSalaryHike
hist(df$PercentSalaryHike, main = "Distribution of Percent Salary Hike", xlab = "Percent Salary Hike", col = "cyan")
# Histogram for TotalWorkingYears
hist(df$TotalWorkingYears, main = "Distribution of Total Working Years", xlab = "Total Working Years", col = "brown")
# Histogram for YearsAtCompany
hist(df$YearsAtCompany, main = "Distribution of Years At Company", xlab = "Years At Company", col = "gray")
# Histogram for YearsInCurrentRole
hist(df$YearsInCurrentRole, main = "Distribution of Years In Current Role", xlab = "Years In Current Role", col = "yellow")


#visualizing correlation between numerical variables using a heatmap
# Load necessary library
library(ggplot2)
library(reshape2)

# Compute correlation matrix
correlation_matrix <- cor(num_cols)

# Plot heatmap
ggplot(data = melt(correlation_matrix), aes(x = Var1, y = Var2, fill = value)) +
  geom_tile() +
  scale_fill_gradient2(low = "red", mid = "lightblue", high = "darkblue", 
                       midpoint = 0, limit = c(-1, 1), space = "Lab",
                       name = "Correlation") +
  theme_minimal() +
  theme(axis.text.x = element_text(angle = 45, vjust = 1, size = 8, hjust = 1)) +
  coord_fixed() +
  labs(title = "Correlation Heatmap of Numerical Variables")


# Count plot of Attrition by Age
ggplot(df, aes(x = Age, fill = factor(Attrition))) +
  geom_bar(position = "dodge") +
  labs(title = "Count plot of Attrition by Age",
       x = "Age",
       y = "Count") +
  theme_minimal() +
  theme(axis.text.x = element_text(angle = 45, hjust = 1)) +
  scale_fill_manual(values = c("0" = "blue", "1" = "red"))

#Box plot of Gender vs Monthly income
ggplot(df, aes(x = Gender, y = MonthlyIncome)) +
  geom_boxplot(fill = "lightblue") +
  labs(title = "Box Plot of Gender vs. Monthly Income",
       x = "Gender",
       y = "Monthly Income") +
  theme_minimal()

# Box Plot monthly income vs. job role
ggplot(df, aes(x = JobRole, y = MonthlyIncome)) +
  geom_boxplot(fill = "lightblue") +
  labs(title = "Box Plot of Job Role vs. Monthly Income",
       x = "Job Role",
       y = "Monthly Income") +
  theme_minimal() +
  theme(axis.text.x = element_text(angle = 45, hjust = 1))


#Bar Graph plot for employees that left and stayed using different attributes
library(gridExtra)
# Create count plots for different variables
p1 <- ggplot(df, aes(x = JobRole, fill = factor(Attrition))) +
  geom_bar(position = "dodge") +
  labs(title = "Count plot of Attrition by Job Role",
       x = "Job Role",
       y = "Count") +
  theme_minimal() +
  theme(axis.text.x = element_text(angle = 45, hjust = 1)) 

p2 <- ggplot(df, aes(x = MaritalStatus, fill = factor(Attrition))) +
  geom_bar(position = "dodge") +
  labs(title = "Count plot of Attrition by Marital Status",
       x = "Marital Status",
       y = "Count") +
  theme_minimal()

p3 <- ggplot(df, aes(x = JobInvolvement, fill = factor(Attrition))) +
  geom_bar(position = "dodge") +
  labs(title = "Count plot of Attrition by Job Involvement",
       x = "Job Involvement",
       y = "Count") +
  theme_minimal()

p4 <- ggplot(df, aes(x = JobLevel, fill = factor(Attrition))) +
  geom_bar(position = "dodge") +
  labs(title = "Count plot of Attrition by Job Level",
       x = "Job Level",
       y = "Count") +
  theme_minimal()

# Arrange plots in a grid
grid.arrange(p1,p2,p3,p4 , ncol = 2)

# Count plot employees left and stayed based on distance from home 
# Create count plot for DistanceFromHome
ggplot(df, aes(x = DistanceFromHome, fill = factor(Attrition))) +
  geom_bar(position = "dodge") +
  labs(title = "Count plot of Attrition by Distance from Home",
       x = "Distance from Home",
       y = "Count") +
  theme_minimal()


# visualizing the Probability Density for continous variable - DistanceFromHome
ggplot() +
  geom_density(data = left_df, aes(x = DistanceFromHome), fill = "red", alpha = 0.5, color = NA) +
  geom_density(data = stayed_df, aes(x = DistanceFromHome), fill = "blue", alpha = 0.5, color = NA) +
  labs(title = "KDE Plot of Distance From Home",
       x = "Distance From Home",
       y = "Density") +
  scale_fill_identity() +
  theme_minimal()

# visualizing the Probability Density for continous variable - YearsWithCurrManager
ggplot() +
  geom_density(data = left_df, aes(x = YearsWithCurrManager), fill = "red", alpha = 0.5, color = NA) +
  geom_density(data = stayed_df, aes(x = YearsWithCurrManager), fill = "blue", alpha = 0.5, color = NA) +
  labs(title = "KDE Plot of Years With Current Manager",
       x = "Years With Current Manager",
       y = "Density") +
  scale_fill_identity() +
  theme_minimal()

# visualizing the Probability Density for continous variable - Total Working Years 
ggplot() +
  geom_density(data = left_df, aes(x = TotalWorkingYears), fill = "red", alpha = 0.5, color = NA) +
  geom_density(data = stayed_df, aes(x = TotalWorkingYears), fill = "blue", alpha = 0.5, color = NA) +
  labs(title = "KDE Plot of Total Working Years",
       x = "Total Working Years",
       y = "Density") +
  scale_fill_identity() +
  theme_minimal()


################################### Data Cleaning #############################################
# Display the first 5 records
head(df)

# Create Data Frame with the necessary Categorical variables 
X_cat <- df[, c("BusinessTravel", "Department", "EducationField", "Gender", "JobRole", "MaritalStatus")]
# Display the new data frame
print(X_cat)
#converting categorical variables into a numerical format that can be provided to machine learning purposes
X_cat_encoded <- model.matrix(~.-1, data = X_cat)
# Display the shape of the encoded data
print(dim(X_cat_encoded))
# Display the encoded data
print(X_cat_encoded)
# Convert the matrix to a data frame
X_cat_df <- as.data.frame(X_cat_encoded)
# Display the data frame
print(X_cat_df)

# Get all numerical columns from the data frame by excluding target variable 'Attrition'
X_numerical <- df[, c("EmployeeID","Age", "DailyRate", "DistanceFromHome", "HourlyRate", 
                      "MonthlyIncome", "MonthlyRate", "NumCompaniesWorked", 
                      "PercentSalaryHike", "TotalWorkingYears", 
                      "TrainingTimesLastYear", "YearsAtCompany", "YearsInCurrentRole", 
                      "YearsSinceLastPromotion", "YearsWithCurrManager")]
# Display the new data frame
print(X_numerical)

# Concatenate the data frames
X_all <- cbind(X_cat_df, X_numerical)
# Display the concatenated data frame
print(X_all)

# Create the dependent variable y
y <- df$Attrition
# Display y
print(y)



############################### Evaulating to find the best model ####################################

#Create training data of the first 80 observations
# Set the seed for reproducibility
set.seed(123)
# Define the proportion for the training set
train_prop <- 0.8
# Determine the number of observations for the training set
train_size <- round(nrow(X_all) * train_prop)
# Generate random indices for the training set
train_indices <- sample(seq_len(nrow(X_all)), size = train_size)
# Create the training set
X_train <- X_all[train_indices, ]
y_train <- y[train_indices]
# Create the testing set
X_test <- X_all[-train_indices, ]
y_test <- y[-train_indices]
# Display the shapes of the training and testing sets
print(dim(X_train))
print(dim(X_test))



############################## Random forest ###########################

# Load the necessary library
library(randomForest)

# Build the Random Forest model
rf_model <- randomForest(x = X_train, y = y_train, ntree = 500)

# Predict using the test set
rf_pred <- predict(rf_model, X_test)

# Evaluate the model
# Define a function to calculate the confusion matrix
calculate_confusion_matrix <- function(actual, predicted) {
  cm <- table(actual, predicted)
  TP <- cm[2, 2]
  TN <- cm[1, 1]
  FP <- cm[1, 2]
  FN <- cm[2, 1]
  accuracy <- (TP + TN) / sum(cm)
  recall <- TP / (TP + FN)
  precision <- TP / (TP + FP)
  f_measure <- 2 * (precision * recall) / (precision + recall)
  sensitivity <- recall
  specificity <- TN / (TN + FP)
  loss_rate <- (FP + FN) / sum(cm)
  
  return(list(Confusion_Matrix = cm,
              Accuracy = accuracy,
              Recall = recall,
              Precision = precision,
              F_Measure = f_measure,
              Sensitivity = sensitivity,
              Specificity = specificity,
              Loss_Rate = loss_rate))
}

# Calculate the confusion matrix and evaluation metrics
evaluation_metrics <- calculate_confusion_matrix(y_test, rf_pred)

# Print the evaluation metrics
print("Evaluation Metrics:")
print(evaluation_metrics)

par(mfrow = c(1, 1))

# Plot ROC curve
library(pROC)
roc_curve <- roc(y_test, as.numeric(rf_pred))
plot(roc_curve, main = "ROC Curve for Random Forest Model", col = "blue")


######################## Naive Bayes ###################################

# Load necessary library for Naive Bayes
library(e1071)

# Train Naive Bayes model
nb_model <- naiveBayes(x = X_train, y = y_train)

# Predict on the testing set
y_pred <- predict(nb_model, newdata = X_test)

# Evaluate the model
library(caret)

# Convert y_pred and y_test to factors with the same levels
y_pred <- factor(y_pred, levels = c("0", "1"))
y_test <- factor(y_test, levels = c("0", "1"))

# Now, let's create the confusion matrix and other metrics
confusionMatrix(data = y_pred, reference = y_test)


# Calculate accuracy
accuracy <- confusionMatrix(data = y_pred, reference = y_test)$overall['Accuracy']
print(paste("Accuracy:", accuracy))

# Calculate recall
recall <- confusionMatrix(data = y_pred, reference = y_test)$byClass['Sensitivity']
print(paste("Recall:", recall))

# Calculate F-measure
f_measure <- confusionMatrix(data = y_pred, reference = y_test)$byClass['F1']
print(paste("F-measure:", f_measure))

# Sensitivity
sensitivity <- confusionMatrix(data = y_pred, reference = y_test)$byClass['Sensitivity']
print(paste("Sensitivity:", sensitivity))

# Loss/Error rate
error_rate <- 1 - accuracy
print(paste("Loss/Error rate:", error_rate))

# ROC Curve
library(pROC)
roc_curve <- roc(y_test, y_pred)
plot(roc_curve, main = "ROC Curve", col = "blue")



################################# Support Vector Machine ######################

# Load the required library for SVM
library(e1071)

# Train the SVM model
svm_model <- svm(Attrition ~ ., data = df[train_indices, ], kernel = "radial")

# Make predictions on the testing set
predictions <- predict(svm_model, newdata = df[-train_indices, ])

# Evaluate the model
conf_matrix <- table(predictions, df$Attrition[-train_indices])
print(conf_matrix)


# Compute accuracy
accuracy <- sum(diag(conf_matrix)) / sum(conf_matrix)

# Compute recall
recall <- conf_matrix[1, 2] / sum(conf_matrix[1, ])


# Compute F-measure
precision <- conf_matrix[1, 2] / sum(conf_matrix[1,])
f_measure <- (2 * precision * recall) / (precision + recall)

# Sensitivity is the same as recall in binary classification

# Compute error rate
error_rate <- 1 - accuracy

# Loss is the same as error rate in binary classification

# You can also plot ROC curves and compute AUC if needed

# Print the performance measures
print(paste("Accuracy:", accuracy))
print(paste("Recall:", recall))
print(paste("F-measure:", f_measure))
print(paste("Error rate:", error_rate))

# Load the pROC library
library(pROC)

# Make predictions on the testing set
predictions <- predict(svm_model, newdata = df[-train_indices, ], decision.values = TRUE)

# Create a ROC curve object
roc_obj <- roc(df$Attrition[-train_indices], predictions)

# Plot the ROC curve
plot(roc_obj, main = "ROC Curve", col = "blue")

# Add a legend
legend("bottomright", legend = paste("AUC =", round(auc(roc_obj), 2)), col = "red", lwd = 2)


############################ KNN Classification ###########################
# Load required libraries
library(class) # For kNN
library(caret) # For model evaluation

# Train the kNN model
knn_model <- knn(train = as.matrix(X_train), test = as.matrix(X_test), cl = y_train, k = 5)

# Make predictions on the test set
y_pred <- as.factor(knn_model)

# Compute accuracy
accuracy <- mean(y_pred == y_test) * 100
print(paste("Accuracy:", round(accuracy, 2), "%"))

# Recall
recall <- cm$byClass["Sensitivity"]

# F-measure
f_measure <- cm$byClass["F1"]

# Sensitivity
sensitivity <- cm$byClass["Sensitivity"]

loss_rate <- 1 - cm$overall["Accuracy"]

# Recall
print(paste("Recall (Sensitivity):", round(recall * 100, 2), "%"))

# F-measure
print(paste("F-measure:", round(f_measure * 100, 2), "%"))

# Sensitivity
print(paste("Sensitivity:", round(sensitivity * 100, 2), "%"))

# Loss/Error Rate
print(paste("Loss/Error Rate:", round(loss_rate * 100, 2), "%"))

library(pROC) # For ROC curve and AUC calculation

# Train the kNN model
knn_model <- knn(train = as.matrix(X_train), test = as.matrix(X_test), cl = y_train, k = 5)

# Make predictions on the test set
y_pred <- as.factor(knn_model)

# Compute probability estimates for positive class
prob_estimates <- ifelse(y_pred == "1", 1, 0)

# Create ROC curve object
roc_obj <- roc(y_test, prob_estimates)

# Plot the ROC curve
plot(roc_obj, main = "ROC Curve for kNN Model", col = "blue")

# Add a legend displaying AUC
legend("bottomright", legend = paste("AUC =", round(auc(roc_obj), 2)), col = "red", lwd = 2)


# Convert y_pred and y_test to factors with the same levels
y_pred <- as.factor(y_pred)
y_test <- as.factor(y_test)

# Ensure that the levels are aligned
levels(y_pred) <- levels(y_test)

# Now create the confusion matrix
cm <- confusionMatrix(y_pred, y_test)
print("Confusion Matrix:")
print(cm)








