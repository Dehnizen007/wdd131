const reviewCountKey = "productReviewCount";
const reviewCountElement = document.querySelector("#review-count");
const submissionSummary = document.querySelector("#submission-summary");
const query = new URLSearchParams(window.location.search);
const productId = query.get("product");
const rating = query.get("rating");
const installationDate = query.get("installation-date");
const submitted = sessionStorage.getItem("pendingProductReview") === "true";

if (submitted && productId && rating && installationDate) {
  const productName = sessionStorage.getItem("pendingProductName");
  const reviewCount = Number(localStorage.getItem(reviewCountKey) || 0) + 1;
  localStorage.setItem(reviewCountKey, reviewCount);
  sessionStorage.removeItem("pendingProductReview");
  sessionStorage.removeItem("pendingProductName");

  submissionSummary.textContent = productName
    ? `Your review of ${productName} has been submitted.`
    : "Your review has been submitted.";
}

reviewCountElement.textContent = localStorage.getItem(reviewCountKey) || "0";
