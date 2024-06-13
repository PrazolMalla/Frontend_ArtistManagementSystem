
<template >
    <div class="z-50 sm:hidden flex justify-evenly py-4 fixed bottom-0 left-0 right-0  bg-light-primary-color h-16 cursor-pointer">

    
                <router-link to="/"><IconHome/></router-link>
                <router-link to="/"><IconExplore/></router-link>
                <router-link to="/"><IconAdd/></router-link>
                <router-link to="/"><IconLibrary/></router-link>
                <router-link to="/"><IconStat/></router-link>
            </div>

</template>
<script setup>
    import IconHome from        '@/components/icons/IconHome.vue'
    import IconExplore from     '@/components/icons/IconExplore.vue'
    import IconAdd from         '@/components/icons/IconAdd.vue'
    import IconLibrary from     '@/components/icons/IconLibrary.vue'
    import IconStat from        '@/components/icons/IconStat.vue'
    const categories= [
        {
          name: 'Manage',
          icon: 'md-manageaccounts-round',
          actions: [
            { to: '/manage/artist', icon: 'fa-microphone', text: 'Artist' },
            { to: '/manage/staff', icon: 'fa-user-shield', text: 'Staff' },
          ],
        },
        {
          name: 'Library',
          icon: 'md-librarymusic',
          actions: [
            { to: '/library/likes', icon: 'fa-heart', text: 'Liked' },
            { to: '/library/follow', icon: 'fa-user-check', text: 'Followed' },
            { to: '/library/history', icon: 'fa-user-clock', text: 'History' },
          ],
        },
        {
          name: 'Explore',
          icon: 'md-explore-sharp',
          actions: [
            { to: '/music', icon: 'fa-music', text: 'Music' },
            { to: '/artist', icon: 'fa-microphone', text: 'Artist' },
            { to: '/band', icon: 'fa-guitar', text: 'Band' },
            { to: '/album', icon: 'md-album', text: 'Album' },
            { to: '/genre', icon: 'md-musicnote-round', text: 'Genre' },
          ],
        },
        {
          name: 'Stats',
          icon: 'fa-chart-line',
          actions: [
            { to: '/stats/artist', icon: 'fa-microphone', text: 'Artist' },
            { to: '/stats/staff', icon: 'fa-user-shield', text: 'Staff' },
            { to: '/stats/user', icon: 'fa-user-alt', text: 'User' },
          ],
        },
      ];
      

</script>