<template>
    <div class="container">
      <div v-for="test in paginatedtests" :key="test.id" class="test">
        <img :src="test.image" class="test-image" alt="test Image" />
        <div class="test-content">
          <h2 class="test-title">{{ test.title }}</h2>
          <p class="test-description">{{ test.description }}</p>
        </div>
      </div>
      
      <div class="pagination">
        <button 
          v-for="page in totalPages" 
          :key="page" 
          @click="currentPage = page" 
          class="page-button" 
          :class="{'active': currentPage === page}">
          {{ page }}
        </button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        tests: [
          { id: 1, image: 'image1.jpg', title: 'Title 1', description: 'Description 1' },
          { id: 2, image: 'image2.jpg', title: 'Title 2', description: 'Description 2' },
          { id: 3, image: 'image3.jpg', title: 'Title 3', description: 'Description 3' },
          { id: 4, image: 'image4.jpg', title: 'Title 4', description: 'Description 4' },
          { id: 5, image: 'image5.jpg', title: 'Title 5', description: 'Description 5' },
          { id: 6, image: 'image6.jpg', title: 'Title 6', description: 'Description 6' },
          { id: 7, image: 'image7.jpg', title: 'Title 7', description: 'Description 7' },
          { id: 8, image: 'image8.jpg', title: 'Title 8', description: 'Description 8' },
          { id: 9, image: 'image9.jpg', title: 'Title 9', description: 'Description 9' },
          { id: 10, image: 'image10.jpg', title: 'Title 10', description: 'Description 10' },
          { id: 11, image: 'image11.jpg', title: 'Title 11', description: 'Description 11' },
          { id: 12, image: 'image12.jpg', title: 'Title 12', description: 'Description 12' }
        ],
        currentPage: 1,
        itemsPerPage: 10
      };
    },
    computed: {
      totalPages() {
        return Math.ceil(this.tests.length / this.itemsPerPage);
      },
      paginatedtests() {
        const start = (this.currentPage - 1) * this.itemsPerPage;
        return this.tests.slice(start, start + this.itemsPerPage);
      }
    }
  };
  </script>
  
  <style>
  .container {
    max-width: 800px;
    margin: auto;
    padding: 20px;
  }
  .test {
    display: flex;
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 1px solid #ddd;
  }
  .test-image {
    width: 30%;
    height: 150px;
    object-fit: cover;
    border-radius: 5px;
  }
  .test-content {
    margin-left: 20px;
    flex: 1;
  }
  .test-title {
    font-size: 20px;
    font-weight: bold;
  }
  .test-description {
    color: #666;
  }
  .pagination {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
  .page-button {
    margin: 0 5px;
    padding: 8px 12px;
    border: 1px solid #007bff;
    background: white;
    cursor: pointer;
    border-radius: 3px;
  }
  .page-button.active {
    background: #007bff;
    color: white;
  }
  </style>