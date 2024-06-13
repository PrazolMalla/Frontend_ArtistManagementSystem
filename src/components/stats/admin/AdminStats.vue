<template>
  <div class="p-8 rounded-lg shadow-lg">
    <h1 class="text-3xl font-bold mb-6  text-white">Stats</h1>

    <div class="justify-around">
      <div class="card w-[32rem] mb-8 bg-light-primary-color" >      
          <h2 class="text-2xl font-semibold mb-4 text-center text-white">Song Performance</h2>
        <div class="chart-container">
          <Bar :data="songPerformanceData" :options="chartOptions" />
        </div>
      </div>

      <div class="card w-[32rem] mb-8 bg-light-primary-color">
        <h2 class="text-2xl font-semibold mb-4 text-center text-white">Genre Distribution</h2>
        <div class="chart-container">
          <Pie :data="genreDistributionData" :options="chartOptions" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { Bar, Pie } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement, PointElement, LineElement } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement, PointElement, LineElement);

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
          borderWidth: 1,
        },
      ],
    });

    const genreDistributionData = ref({
      labels: ['Rock', 'Pop', 'Jazz', 'Classical', 'Hip Hop'],
      datasets: [
        {
          label: 'Genre Distribution',
          data: [12, 19, 3, 5, 2],
          backgroundColor: ['#4a90e2', '#50e3c2', '#f5a623', '#e94e77', '#7ed321'],
          borderColor: '#080727',
          borderWidth: 1,
        },
      ],
    });

    const chartOptions = ref({
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: 'white', 
          },
        },
        x: {
          ticks: {
            color: 'white', 
          },
        },
      },
      plugins: {
        legend: {
          labels: {
            color: 'white', 
          },
        },
        tooltip: {
          titleColor: 'white', 
          bodyColor: 'white', 
        },
      },
    });

    return {
      songPerformanceData,
      genreDistributionData,
      chartOptions,
    };
  },
};
</script>

<style scoped>
.card {
  backdrop-filter: blur(10px);
  border-radius: 0.75rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
}
</style>
