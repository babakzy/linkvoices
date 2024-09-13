export default function convertToSimpleDate(dateString) {
    // Create a new Date object from the string
    const date = new Date(dateString);
    
    // Extract the year, month, and day
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0');
    
    // Return the date in YYYY-MM-DD format
    return `${year}-${month}-${day}`;
  }
  