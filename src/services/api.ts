const API_CONFIG = {
  key: 'bee6eaa86emshcbc0be0830fe652p1f1b94jsn3df686be0c37',
  host: 'programming-memes-images.p.rapidapi.com'
};

export const fetchMemes = async () => {
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': API_CONFIG.key,
      'x-rapidapi-host': API_CONFIG.host
    }
  };

  try {
    const response = await fetch(
      'https://programming-memes-images.p.rapidapi.com/v1/memes',
      options
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.slice(0, 4).map((meme: any, index: number) => ({
      url: meme.image,
      title: `Programming Meme ${index + 1}`,
      template: `meme-${index}`
    }));
  } catch (error) {
    console.error("Error fetching memes:", error);
    throw error;
  }
};

export const generateMeme = async (index: number) => {
  try {
    const memes = await fetchMemes();
    return memes[index % memes.length];
  } catch (error) {
    console.error("Error generating meme:", error);
    throw error;
  }
};

export const shareToTwitter = async (imageUrl: string) => {
  const message = "Check out these carter meme today!";
  
  // Twitter Web Intent with media
  const twitterIntent = new URL('https://twitter.com/intent/tweet');
  twitterIntent.searchParams.append('text', message);
  twitterIntent.searchParams.append('url', imageUrl);
  
  // Open Twitter intent in a new window
  window.open(twitterIntent.toString(), '_blank', 'width=550,height=420');
};