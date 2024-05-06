<h1>Upbeat AI</h1>
Unleash personalized playlists based on your mood. Experience the fusion of ChatGPT and Spotify!

[upbeat](https://github.com/jefedcreator/upbeat-ai/assets/72661662/9baa0ebd-a673-4d7f-9ab2-0457276502fb)

## Table of Contents

[Introduction](#Introduction)

[Getting Started](#getting-started)

[Development Setup](#development-setup)

[Spotify Web API Walkthrough](#spotify-web-api-walkthrough)

[Live](#live-app)

# Introduction

Welcome to Upbeat – Your Ultimate Mood-Boosting Music Companion.

Experience a harmonious blend of emotions and music with Upbeat. Imagine a dynamic playlist that evolves alongside your feelings, where each note perfectly captures your mood. Get ready to embark on a unique musical journey as the synergy between ChatGPT and Spotify creates an unparalleled experience.

**Key Features:**

- Personalized Mood Playlists: Let Upbeat curate playlists that mirror your emotions. From joy to introspection, each playlist is finely tuned to enhance your mood.

- Seamless Integration: Effortlessly connect your Spotify account and let Upbeat enhance your existing library. No more searching – let Upbeat's AI recommendations do the work.

- Global Musical Exploration: Discover the world's melodies through Upbeat's AI-powered recommendations. Explore diverse genres and cultures, all tailored to your emotional state.

### Entity Relationship Diagram

![My Image](UpbeatERD.png)

# Getting Started

## Node Dependencies

Once you have your integrated development environment setup and running, install dependencies by navigating to the `/upbeat-ai` directory and running:

```bash
npm install
```

### Key Dependencies

- [Nextjs 13](https://nextjs.org/) Nextjs is The React Framework for building fullstack applications on the Web.

- [Next-auth](https://next-auth.js.org/) NextAuth.js is a complete open-source authentication solution for Next.js applications.

- [OpenAI](https://platform.openai.com/docs/api-reference/introduction) OpenAI's GPT (generative pre-trained transformer) models have been trained to understand natural language.

- [Tailwindcss](https://tailwindcss.com/) Tailwind CSS is mobile first, utility class based open source CSS framework.

- [Typescript](https://www.typescriptlang.org/) TypeScript is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale.

## Development Setup

### **Download the project starter code locally**

```bash
git clone https://github.com/jefedcreator/upbeat-ai.git
cd upbeat-ai/
```

### **Add Enviromental Variables**

```bash
touch .env.local
NEXT_PUBLIC_OPENAI_API_KEY=
NEXT_PUBLIC_SPOTIFY_CLIENT_ID=
NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET=
NEXTAUTH_SECRET=
NEXT_PUBLIC_SECRET=
```

### **To contribute to the upstream repository path from your local repository, use the commands below:**

```bash
git remote add upstream https://github.com/jefedcreator/upbeat-ai.git
git remote -v
git checkout -b <branch name>
```

Once you have finished editing your code, you can push the local repository to the Github repository using the following commands.

```bash
git add . --all
git commit -m "your comment"
git push -u origin <branch name>
```

### **Install the dependencies:**

```bash
npm install
# or
yarn install
```

### **Run the development server:**

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

### **Verify on the Browser**<br>

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Spotify Web API Walkthrough

`GET 'https://api.spotify.com/v1/search?q=track:{song}%20$artist:{artist}&type=track'`

- Get Spotify catalog information about albums, artists, playlists, tracks, shows, episodes or audiobooks that match a keyword string.
- Headers:

```json
{
  "Content-Type": "application/json",
  "Authorization": "Bearer {accessToken}"
}
```

- Returns:

```json
{
"tracks": {
  "href": "https://api.spotify.com/v1/me/shows?offset=0&limit=20",
  "limit": 20,
  "next": "https://api.spotify.com/v1/me/shows?offset=1&limit=1",
  "offset": 0,
  "previous": "https://api.spotify.com/v1/me/shows?offset=1&limit=1",
  "total": 4,
  "items": [
    {
      "album": {
        "album_type": "compilation",
        "total_tracks": 9,
        "available_markets": [
          "CA",
          "BR",
          "IT"
        ],
        "external_urls": {
          "spotify": "string"
        },
        "href": "string",
        "id": "2up3OPMp9Tb4dAKM2erWXQ",
        "images": [
          {
            "url": "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228",
            "height": 300,
            "width": 300
          }
        ],
        "name": "string",
        "release_date": "1981-12",
        "release_date_precision": "year",
        "restrictions": {
          "reason": "market"
        },
        "type": "album",
        "uri": "spotify:album:2up3OPMp9Tb4dAKM2erWXQ",
        "copyrights": [
          {
            "text": "string",
            "type": "string"
          }
        ],
        "external_ids": {
          "isrc": "string",
          "ean": "string",
          "upc": "string"
        },
        "genres": [
          "Egg punk",
          "Noise rock"
        ],
        "label": "string",
        "popularity": 0,
        "album_group": "compilation",
        "artists": [
          {
            "external_urls": {
              "spotify": "string"
            },
            "href": "string",
            "id": "string",
            "name": "string",
            "type": "artist",
            "uri": "string"
          }
        ]
      },
      "artists": [
        {
          "external_urls": {
            "spotify": "string"
          },
          "followers": {
            "href": "string",
            "total": 0
          },
          "genres": [
            "Prog rock",
            "Grunge"
          ],
          "href": "string",
          "id": "string",
          "images": [
            {
              "url": "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228",
              "height": 300,
              "width": 300
            }
          ],
          "name": "string",
          "popularity": 0,
          "type": "artist",
          "uri": "string"
        }
      ],
      "available_markets": [
        "string"
      ],
      "disc_number": 0,
      "duration_ms": 0,
      "explicit": false,
      "external_ids": {
        "isrc": "string",
        "ean": "string",
        "upc": "string"
      },
      "external_urls": {
        "spotify": "string"
      },
      "href": "string",
      "id": "string",
      "is_playable": false,
      "linked_from": {},
      "restrictions": {
        "reason": "string"
      },
      "name": "string",
      "popularity": 0,
      "preview_url": "string",
      "track_number": 0,
      "type": "track",
      "uri": "string",
      "is_local": false
    }
  ]
}"
}
```

`GET 'https://api.spotify.com/v1/playlists/{playlist_id}'`

- Get a playlist owned by a Spotify user.

- Headers:

```json
{
  "Content-Type": "application/json",
  "Authorization": "Bearer {accessToken}"
}
```

- Returns:

```json
{
  "collaborative": false,
  "description": "string",
  "external_urls": {
    "spotify": "string"
  },
  "followers": {
    "href": "string",
    "total": 0
  },
  "href": "string",
  "id": "string",
  "images": [
    {
      "url": "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228",
      "height": 300,
      "width": 300
    }
  ],
  "name": "string",
  "owner": {
    "external_urls": {
      "spotify": "string"
    },
    "followers": {
      "href": "string",
      "total": 0
    },
    "href": "string",
    "id": "string",
    "type": "user",
    "uri": "string",
    "display_name": "string"
  },
  "public": false,
  "snapshot_id": "string",
  "tracks": {
    "href": "https://api.spotify.com/v1/me/shows?offset=0&limit=20",
    "limit": 20,
    "next": "https://api.spotify.com/v1/me/shows?offset=1&limit=1",
    "offset": 0,
    "previous": "https://api.spotify.com/v1/me/shows?offset=1&limit=1",
    "total": 4,
    "items": [
      {
        "added_at": "string",
        "added_by": {
          "external_urls": {
            "spotify": "string"
          },
          "followers": {
            "href": "string",
            "total": 0
          },
          "href": "string",
          "id": "string",
          "type": "user",
          "uri": "string"
        },
        "is_local": false,
        "track": {
          "album": {
            "album_type": "compilation",
            "total_tracks": 9,
            "available_markets": ["CA", "BR", "IT"],
            "external_urls": {
              "spotify": "string"
            },
            "href": "string",
            "id": "2up3OPMp9Tb4dAKM2erWXQ",
            "images": [
              {
                "url": "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228",
                "height": 300,
                "width": 300
              }
            ],
            "name": "string",
            "release_date": "1981-12",
            "release_date_precision": "year",
            "restrictions": {
              "reason": "market"
            },
            "type": "album",
            "uri": "spotify:album:2up3OPMp9Tb4dAKM2erWXQ",
            "copyrights": [
              {
                "text": "string",
                "type": "string"
              }
            ],
            "external_ids": {
              "isrc": "string",
              "ean": "string",
              "upc": "string"
            },
            "genres": ["Egg punk", "Noise rock"],
            "label": "string",
            "popularity": 0,
            "album_group": "compilation",
            "artists": [
              {
                "external_urls": {
                  "spotify": "string"
                },
                "href": "string",
                "id": "string",
                "name": "string",
                "type": "artist",
                "uri": "string"
              }
            ]
          },
          "artists": [
            {
              "external_urls": {
                "spotify": "string"
              },
              "followers": {
                "href": "string",
                "total": 0
              },
              "genres": ["Prog rock", "Grunge"],
              "href": "string",
              "id": "string",
              "images": [
                {
                  "url": "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228",
                  "height": 300,
                  "width": 300
                }
              ],
              "name": "string",
              "popularity": 0,
              "type": "artist",
              "uri": "string"
            }
          ],
          "available_markets": ["string"],
          "disc_number": 0,
          "duration_ms": 0,
          "explicit": false,
          "external_ids": {
            "isrc": "string",
            "ean": "string",
            "upc": "string"
          },
          "external_urls": {
            "spotify": "string"
          },
          "href": "string",
          "id": "string",
          "is_playable": false,
          "linked_from": {},
          "restrictions": {
            "reason": "string"
          },
          "name": "string",
          "popularity": 0,
          "preview_url": "string",
          "track_number": 0,
          "type": "track",
          "uri": "string",
          "is_local": false
        }
      }
    ]
  },
  "type": "string",
  "uri": "string"
}
```

`GET 'https://api.spotify.com/v1/recommendations?seed_tracks={tracks}'`

- Recommendations are generated based on the available information for a given seed entity and matched against similar artists and tracks. If there is sufficient information about the provided seeds, a list of tracks will be returned together with pool size details.

- Headers:

```json
{
  "Content-Type": "application/json",
  "Authorization": "Bearer {accessToken}"
}
```

- Returns:

```json
{
  "tracks": [
    {
      "album": {
        "album_type": "compilation",
        "total_tracks": 9,
        "available_markets": ["CA", "BR", "IT"],
        "external_urls": {
          "spotify": "string"
        },
        "href": "string",
        "id": "2up3OPMp9Tb4dAKM2erWXQ",
        "images": [
          {
            "url": "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228",
            "height": 300,
            "width": 300
          }
        ],
        "name": "string",
        "release_date": "1981-12",
        "release_date_precision": "year",
        "restrictions": {
          "reason": "market"
        },
        "type": "album",
        "uri": "spotify:album:2up3OPMp9Tb4dAKM2erWXQ",
        "copyrights": [
          {
            "text": "string",
            "type": "string"
          }
        ],
        "external_ids": {
          "isrc": "string",
          "ean": "string",
          "upc": "string"
        },
        "genres": ["Egg punk", "Noise rock"],
        "label": "string",
        "popularity": 0,
        "album_group": "compilation",
        "artists": [
          {
            "external_urls": {
              "spotify": "string"
            },
            "href": "string",
            "id": "string",
            "name": "string",
            "type": "artist",
            "uri": "string"
          }
        ]
      },
      "artists": [
        {
          "external_urls": {
            "spotify": "string"
          },
          "followers": {
            "href": "string",
            "total": 0
          },
          "genres": ["Prog rock", "Grunge"],
          "href": "string",
          "id": "string",
          "images": [
            {
              "url": "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228",
              "height": 300,
              "width": 300
            }
          ],
          "name": "string",
          "popularity": 0,
          "type": "artist",
          "uri": "string"
        }
      ],
      "available_markets": ["string"],
      "disc_number": 0,
      "duration_ms": 0,
      "explicit": false,
      "external_ids": {
        "isrc": "string",
        "ean": "string",
        "upc": "string"
      },
      "external_urls": {
        "spotify": "string"
      },
      "href": "string",
      "id": "string",
      "is_playable": false,
      "linked_from": {},
      "restrictions": {
        "reason": "string"
      },
      "name": "string",
      "popularity": 0,
      "preview_url": "string",
      "track_number": 0,
      "type": "track",
      "uri": "string",
      "is_local": false
    }
  ]
}
```

`POST 'https://api.spotify.com/v1/users/{user_id}/playlists'`

- Create a playlist for a Spotify user. (The playlist will be empty until you add tracks.)

- Headers:

```json
{
  "Content-Type": "application/json",
  "Authorization": "Bearer {accessToken}"
}
```

- Body:

```json
{
  "name": "New Playlist",
  "description": "New playlist description",
  "public": false
}
```

- Returns:

```json
{
  "collaborative": false,
  "description": "New playlist description",
  "external_urls": {
    "spotify": "https://open.spotify.com/playlist/0hrOuE9ealYROUw3eiIVvk"
  },
  "followers": {
    "href": null,
    "total": 0
  },
  "href": "https://api.spotify.com/v1/playlists/0hrOuE9ealYROUw3eiIVvk",
  "id": "0hrOuE9ealYROUw3eiIVvk",
  "images": [],
  "name": "New Playlist",
  "owner": {
    "display_name": "8thgod",
    "external_urls": {
      "spotify": "https://open.spotify.com/user/yo3sn456f10785pw81nohq37f"
    },
    "href": "https://api.spotify.com/v1/users/yo3sn456f10785pw81nohq37f",
    "id": "yo3sn456f10785pw81nohq37f",
    "type": "user",
    "uri": "spotify:user:yo3sn456f10785pw81nohq37f"
  },
  "primary_color": null,
  "public": false,
  "snapshot_id": "MSxjMjFkY2ZlM2JhOWE4YTE1Y2UyMzU2N2Q5NmIyZTBiNjgxZWE2MWMw",
  "tracks": {
    "href": "https://api.spotify.com/v1/playlists/0hrOuE9ealYROUw3eiIVvk/tracks",
    "items": [],
    "limit": 100,
    "next": null,
    "offset": 0,
    "previous": null,
    "total": 0
  },
  "type": "playlist",
  "uri": "spotify:playlist:0hrOuE9ealYROUw3eiIVvk"
}
```

`POST 'https://api.spotify.com/v1/playlists/{playlist_id}/tracks'`

- Add one or more items to a user's playlist.

- Headers:

```json
{
  "Content-Type": "application/json",
  "Authorization": "Bearer {accessToken}"
}
```

- Body:

```json
{
    "uris": [spotifyTrackIds],
    "position": 0,
}
```

- Response:

```json
{
  "snapshot_id": "abc"
}
```

## Live App

<b>[Upbeat](https://upbeatai.vercel.app/)

### Demo

<b>[Youtube](https://youtu.be/DNfqiqtwrzM)

#### Prompts

Try the follwing propmts to generate a playlist

```text
. I am feeling happy
. I am feeling sad
. I am feeling angry
. I am feeling like listening to some afrobeats
. I am feeling like listening to some rnb
```

When interacting with the bot, go straight to the
point, one sentence is enough. it's not the smartest
ai but it understands context, so it may ask you
for clarification or return what you just said. no
worries, just repeat yourself again
