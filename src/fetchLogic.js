export const fetchLogic = () => {
  const fetchData = async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      // preferably remove console.log in production code
      return data;
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  return { fetchData };
};
