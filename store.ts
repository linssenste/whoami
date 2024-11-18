//store.ts
import { defineStore, acceptHMRUpdate } from 'pinia'
import type { AlbumCover } from './components/music/AlbumCover.vue'

export const useStore = defineStore('music-player-store', {
	
  state: () => {
    return {
      
    covers: [] as AlbumCover[],

	  isPlaying: false,
    selectedAlbum: null as AlbumCover | null,
	  trackId: ''
    }
  },

  actions:{
	// play pause toggle
	setPlayStatus(playing: boolean){
		this.isPlaying = playing
	},

	// change track to a random track from the selected album
     changeTrack(item: AlbumCover){
    this.selectedAlbum = item
    if (Array.isArray(item.tracks) && item.tracks.length > 0) {
      this.trackId = item.tracks[Math.floor(Math.random() * item.tracks.length)]
    } else {
      this.trackId = ''
    }

     },

	 // load covers to store
   setCovers(covers: AlbumCover[]) {
     this.covers = covers;
   },

    // randomly shuffle track or just by an artist
  shuffleTracks(artistId: string | null = null) {
    // get all albums
    let albums: AlbumCover[] = this.covers;
  // filter albums by artistId if provided
  if (artistId != null) albums = this.covers.filter((cover: AlbumCover) => cover.artists && cover.artists.length > 0 && cover.artists[0].id == artistId);

    // if no albums found, use all covers
    if (albums.length === 0) albums = this.covers;

    // select a random album
    const randomAlbum = albums[Math.floor(Math.random() * albums.length)];

    // change the track to the randomly selected track if it exists
    if (randomAlbum) {
      this.changeTrack(randomAlbum);
    }
  }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(
    acceptHMRUpdate(useStore, import.meta.hot)
  )
}