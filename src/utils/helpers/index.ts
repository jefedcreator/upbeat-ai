export const getData = async (
  song: string,
  artist: string | null,
  session: any
) => {
  try {
    const response: any = await Promise.race([
      fetch(
        `https://api.spotify.com/v1/search?q=track:${song}%20${
          artist && `artist:${artist}`
        }&type=track`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.accessToken}`,
          },
        }
      ),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Network Timeout")), 10000)
      ),
    ]);
    const res = await response.json();
    // console.log("track res:", res.tracks.items[0].id ?? null);
    const id = res.tracks?.items[0]?.id ?? null;
    return id;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getPlaylistData = async (playlistId: string, session: any) => {
  try {
    const response: any = await Promise.race([
      fetch(`https://api.spotify.com/v1/playlists/${playlistId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.accessToken}`,
        },
      }),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Network Timeout")), 10000)
      ),
    ]);
    const res = await response.json();

    const { name, description, external_urls, images, tracks: songs } = res;
    const tracks = songs.items.map((song: any) => {
      return {
        name: song.track.name,
        artist: song.track.artists[0].name,
        image: song.track.album.images[2].url,
      };
    });

    return {
      name,
      description,
      url: external_urls.spotify,
      image: images[1].url,
      tracks,
    };
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getReccomendation = async (tracks: string, session: any) => {
  try {
    const response: any = await Promise.race([
      fetch(
        `https://api.spotify.com/v1/recommendations?seed_tracks=${tracks}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.accessToken}`,
          },
        }
      ),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Network Timeout")), 10000)
      ),
    ]);
    const res = await response.json();

    const spotifyTracks = res.tracks.map(
      (track: any) => `spotify:track:${track.id}`
    );

    return spotifyTracks;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const createPlaylist = async (session: any) => {
  try {
    const response: any = await Promise.race([
      fetch(`https://api.spotify.com/v1/users/${session.user}/playlists`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.accessToken}`,
        },
        body: JSON.stringify({
          name: "Upbeat Playlist",
          description: "We hope this playlist makes you feel better 😉",
          public: false,
        }),
      }),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Network Timeout")), 10000)
      ),
    ]);
    const res = await response.json();

    return res.id;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const updatePlaylist = async (
  playlistId: string,
  spotifyTrackIds: string[],
  session: any
) => {
  try {
    const response: any = await Promise.race([
      fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.accessToken}`,
        },
        body: JSON.stringify({
          uris: spotifyTrackIds,
          position: 0,
        }),
      }),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Network Timeout")), 10000)
      ),
    ]);
    const res = await response.json();

    return res;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export function shuffleArray(array: string[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
