<template>
  <div>

    <v-img :src="require('~/assets/bg.jpg')">
      <v-overlay z-index="-1" :value="overlay">
      </v-overlay>
      <v-container fluid>
        <v-row justify="center">
          <v-col cols="12" lg="8" md="10" style="opacity:0.7">
            <v-card style="margin:10%">
              <v-container fluid v-if="forecast">
                <v-row>
                  <v-col>
                    <v-menu offset-y>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn text x-large dark class="text-capitalize px-0" v-on="on">
                          <p class="text-h4 mb-0">{{ city }}</p>
                          <v-icon size="40">mdi-menu-down</v-icon>
                        </v-btn>
                      </template>
                      <v-list dense>
                        <v-list-item v-for="(item, index) in cities" :key="index" @click="city = item.title">
                          <v-list-item-title>{{ item.title }}</v-list-item-title>
                        </v-list-item>
                      </v-list>
                    </v-menu>

                    <p>{{ new Date(forecast.location.localtime).toDateString() }}</p>
                    <v-row>
                      <v-img :src="forecast.current.condition.icon" max-width="50"></v-img>
                      <p class="titlefont-weight-bold mt-3 ml-1">{{ forecast.current.condition.text }}</p>
                    </v-row>

                  </v-col>
                  <v-col>
                    <p class="text-h1">{{ forecast.current.temp_c }}<sup><small>o</small></sup>C</p>
                    <p>Feels like: {{ forecast.current.feelslike_c }}<sup><small>o</small></sup>C</p>
                  </v-col>
                </v-row>
                <v-row no-gutters>
                  <v-tabs dark show-arrows height="250" hide-slider>
                    <v-card flat disabled v-for="item, i in forecast.forecast.forecastday" :key="i"
                      class="rounded-lg mx-3 text-capitalize">
                      <p><b>{{ new Date(item.date).toLocaleString('default', { month: 'short' }) + ' ' + new
                        Date(item.date).getDate() }}</b></p>
                      <v-divider style="border:1px solid yellow"></v-divider>
                      <v-col align="center">
                        <small>Max Temp : {{item.day.maxtemp_c}}<sup><small>o</small></sup>C</small><br>
                        <small>Min Temp : {{item.day.maxtemp_c}}<sup><small>o</small></sup>C</small>

                        <v-img :src="item.day.condition.icon" max-width="50"></v-img>
                        <p class="caption" style="max-width: 100px;">{{ item.day.condition.text }}</p>
                      </v-col>
                    </v-card>
                  </v-tabs>
                </v-row>
              </v-container>
            </v-card>
          </v-col>
        </v-row>
      </v-container>

    </v-img>
  </div>
</template>

<script>
export default {
  data() {
    return {
      overlay: true,
      city: 'Reno',
      forecast: '',
      cities: [
        { title: 'Reno' },
        { title: 'Austin' },
        { title: 'Tampa' }
      ]
    }
  },
  watch: {
    city() {
      this.getForecast()
    }
  },
  mounted() {
    this.getForecast()
  },
  methods: {
    getForecast() {
      this.$axios.post('http://localhost:8000/api/forecast', {
        days: 14,
        city: this.city
      }).then(res => {
        this.forecast = res.data.data
      }).catch(err => console.log(err.response))
    },
    height() {
      if (process.client) {
        return window.innerHeight
      }
    }
  }
}
</script>
