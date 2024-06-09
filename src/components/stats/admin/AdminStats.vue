<!-- <template>
  <div class="rounded-lg">
    <h1 class="text-3xl font-bold mb-6 text-primary-text-color">Stats</h1>

    <div class="justify-around">
      <div class="card w-[45vw] mb-8 bg-light-primary-color">
        <h2 class="text-2xl font-semibold mb-4 text-center text-primary-text-color">
          Song Performance
        </h2>
        <div class="chart-container">
          <Bar :data="songPerformanceData" :options="chartOptions" />
        </div>
      </div>

      <div class="card w-[45vw] mb-8 bg-light-primary-color">
        <h2 class="text-2xl font-semibold mb-4 text-center text-primary-text-color">
          Country Distribution
        </h2>
        <div class="chart-container">
          <Pie :data="countryDistributionData" :options="chartOptions" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { Bar, Pie } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  PointElement,
  LineElement
} from 'chart.js'

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  PointElement,
  LineElement
)

export default {
  name: 'ArtistDashboard',
  components: {
    Bar,
    Pie
  },
  setup() {
    const songPerformanceData = ref({
      labels: ['Song One', 'Song Two', 'Song Three', 'Song Four', 'Song Five'],
      datasets: [
        {
          label: 'Number of Plays',
          data: [1500, 1200, 1100, 900, 700],
          backgroundColor: ['#4a90e2', '#50e3c2', '#f5a623', '#e94e77', '#7ed321'],
          borderColor: '#080727',
          borderWidth: 1
        }
      ]
    })

    const countryDistributionData = ref({
      labels: [],
      datasets: [
        {
          label: 'Country Distribution',
          data: [],
          backgroundColor: [],
          borderColor: '#080727',
          borderWidth: 1
        }
      ]
    })

    const chartOptions = ref({
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: '#302f31'
          }
        },
        x: {
          ticks: {
            color: '#302f31'
          }
        }
      },
      plugins: {
        legend: {
          labels: {
            color: '#302f31'
          }
        },
        tooltip: {
          titleColor: '#ffffff',
          bodyColor: '#ffffff',
        }
      }
    })

    const fetchCountryData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/country/country-data/')
        const data = response.data

        const labels = []
        const counts = []
        const backgroundColors = ['#4a90e2', '#50e3c2', '#f5a623', '#e94e77', '#7ed321', '#f8e71c', '#8b572a', '#bd10e0', '#b8e986', '#ff001f']

        data.forEach((item, index) => {
          if (!labels.includes(item.country)) {
            labels.push(item.country)
            counts.push(item.count)
          } else {
            const countryIndex = labels.indexOf(item.country)
            counts[countryIndex] += item.count
          }
        })

        countryDistributionData.value = {
          labels: labels,
          datasets: [
            {
              label: 'Country Distribution',
              data: counts,
              backgroundColor: backgroundColors.slice(0, labels.length),
              borderColor: '#080727',
              borderWidth: 1
            }
          ]
        }
      } catch (error) {
        console.error('Error fetching country data:', error)
      }
    }

    onMounted(() => {
      fetchCountryData()
    })

    return {
      songPerformanceData,
      countryDistributionData,
      chartOptions
    }
  }
}
</script>

<style scoped>
.card {
  backdrop-filter: blur(10px);
  border-radius: 0.75rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
}
</style> -->
<template>
  <div class="rounded-lg">
    <h1 class="text-3xl font-bold mb-6 text-primary-text-color">Stats</h1>

    <div v-if="userCreationStatsData.labels.length > 0 && countryDistributionData.labels.length > 0" class="justify-around">
      <div class="card w-[45vw] mb-8 bg-light-primary-color">
        <h2 class="text-2xl font-semibold mb-4 text-center text-primary-text-color">
          User Creation Stats
        </h2>
        <div class="chart-container">
          <Line :data="userCreationStatsData" :options="chartOptions" />
        </div>
      </div>

      <div class="card w-[45vw] mb-8 bg-light-primary-color">
        <h2 class="text-2xl font-semibold mb-4 text-center text-primary-text-color">
          Country Distribution
        </h2>
        <div class="chart-container">
          <Pie :data="countryDistributionData" :options="chartOptions" />
        </div>
      </div>
    </div>

    <div v-else class="text-center text-gray-500">Loading...</div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { Line, Pie } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  CategoryScale,
  LinearScale
} from 'chart.js'

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  CategoryScale,
  LinearScale
)

export default {
  name: 'ArtistDashboard',
  components: {
    Line,
    Pie
  },
  setup() {
    const userCreationStatsData = ref({
      labels: [],
      datasets: [
        {
          label: 'User Creation Stats',
          data: [],
          backgroundColor: '#4a90e2',
          borderColor: '#080727',
          borderWidth: 1
        }
      ]
    })

    const countryDistributionData = ref({
      labels: [],
      datasets: [
        {
          label: 'Country Distribution',
          data: [],
          backgroundColor: [],
          borderColor: '#080727',
          borderWidth: 1
        }
      ]
    })

    const chartOptions = ref({
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
            color: '#302f31'
          }
        }],
        xAxes: [{
          ticks: {
            color: '#302f31'
          }
        }]
      },
      plugins: {
        legend: {
          labels: {
            color: '#302f31'
          }
        },
        tooltip: {
          titleColor: '#ffffff',
          bodyColor: '#ffffff',
        }
      }
    })

    const fetchCountryData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/country/country-data/')
        const data = response.data

        const labels = []
        const counts = []
        const backgroundColors = ['#4a90e2', '#50e3c2', '#f5a623', '#e94e77', '#7ed321', '#f8e71c', '#8b572a', '#bd10e0', '#b8e986', '#ff001f']

        data.forEach((item, index) => {
          if (!labels.includes(item.country)) {
            labels.push(item.country)
            counts.push(item.count)
          } else {
            const countryIndex = labels.indexOf(item.country)
            counts[countryIndex] += item.count
          }
        })

        countryDistributionData.value = {
          labels: labels,
          datasets: [
            {
              label: 'Country Distribution',
              data: counts,
              backgroundColor: backgroundColors.slice(0, labels.length),
              borderColor: '#080727',
              borderWidth: 1
            }
          ]
        }
      } catch (error) {
        console.error('Error fetching country data:', error)
      }
    }

    const fetchUserCreationStats = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/user/user-creation-stats/')
        const data = response.data

        userCreationStatsData.value = {
          labels: data.dates,
          datasets: [
            {
              label: 'User Creation Stats',
              data: data.counts,
              backgroundColor: '#4a90e2',
              borderColor: '#080727',
              borderWidth: 1
            }
          ]
        }
      } catch (error) {
        console.error('Error fetching user creation stats:', error)
      }
    }

    onMounted(() => {
      fetchCountryData()
      fetchUserCreationStats()
    })

    return {
      userCreationStatsData,
      countryDistributionData,
      chartOptions
    }
  }
}
</script>

<style scoped>
.card {
  backdrop-filter: blur(10px);
  border-radius: 0.75rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
}
</style>
