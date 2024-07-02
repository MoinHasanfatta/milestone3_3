const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server/app');
const Product = require('../server/models/Product');


beforeAll(async () => {
    // Check if already connected to avoid multiple connections
    if (mongoose.connection.readyState === 0) {
        await mongoose.connect('mongodb://localhost:27017/testdb', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    }
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe('GET /api/products', () => {
    it('should_return_all_products', async () => {
        const mockProducts = [
            { _id: '1', name: 'Product 1', description: 'Description 1', image: 'image1.jpg' },
            { _id: '2', name: 'Product 2', description: 'Description 2', image: 'image2.jpg' },
        ];

        Product.find = jest.fn().mockResolvedValue(mockProducts);

        const response = await request(app).get('/api/products');

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockProducts);
    });

    it('should_handle_errors_and_respond_with_a_500_status_code', async () => {
        const error = new Error('Database error');
        Product.find = jest.fn().mockRejectedValue(error);

        const response = await request(app).get('/api/products');

        expect(response.status).toBe(500);
        expect(response.body).toEqual({ message: error.message });
    });
});

describe('POST /api/products', () => {
    it('should_create_a_new_product_and_respond_with_a_201_status_code', async () => {
        const newProduct = {
            name: 'New Product',
            description: 'New Description',
            image: 'newimage.jpg',
        };

        Product.prototype.save = jest.fn().mockResolvedValue(newProduct);

        const response = await request(app).post('/api/products').send(newProduct);

        expect(response.status).toBe(201);
        expect(response.body).toEqual(newProduct);
    });
})

it('should_handle_validation_errors_and_respond_with_a_400_status_code', async () => {
    const invalidProduct = { name: '', description: '', image: '' };

    const response = await request(app).post('/api/products').send(invalidProduct);

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: 'Incomplete product data' });
});

it('should_handle_errors_and_respond_with_a_500_status_code', async () => {
    const newProduct = {
        name: 'New Product',
        description: 'New Description',
        image: 'newimage.jpg',
    };
    const error = new Error('Database error');
    Product.prototype.save = jest.fn().mockRejectedValue(error);

    const response = await request(app).post('/api/products').send(newProduct);

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ message: 'Internal Server Error' });
});

describe('POST /api/products/:id/review', () => {
    it('should_add_a_review_to_a_product_and_respond_with_a_201_status_code', async () => {
        const review = {
            user: 'John Doe',
            rating: 5,
            comment: 'Great product!',
        };

        const product = {
            _id: '1',
            name: 'Product 1',
            description: 'Description 1',
            image: 'image1.jpg',
            reviews: [],
            save: jest.fn().mockResolvedValue({
                ...this,
                reviews: [review],
            }),
        };

        Product.findById = jest.fn().mockResolvedValue(product);

        const response = await request(app).post(`/api/products/${product._id}/review`).send(review);

        expect(response.status).toBe(201);
        expect(response.body.reviews).toContainEqual(review);
    });
})

describe('DELETE /api/products/:id', () => {
    it('should_delete_a_product_and_respond_with_a_200_status_code', async () => {
        const product = { _id: '1', name: 'Product 1', description: 'Description 1', image: 'image1.jpg' };

        Product.findByIdAndDelete = jest.fn().mockResolvedValue(product);

        const response = await request(app).delete(`/api/products/${product._id}`);

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            message: 'Product deleted',
            deletedProduct: product,
        });
    });
})

it('should_handle_errors_when_not_connected_to_database', async () => {
    const newProduct = {
        name: 'New Product',
        description: 'New Description',
        image: 'newimage.jpg',
    };
    const error = new Error('Database error');
    Product.prototype.save = jest.fn().mockRejectedValue(error);

    const response = await request(app).post('/api/products').send(newProduct);

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ message: 'Internal Server Error' });
});


describe('POST /api/products', () => {
    it('should_create_a_new_product_and_respond_with_a_201_status_code', async () => {
        const newProduct = {
            name: 'New Product',
        };
    })
})

describe('POST /api/products', () => {
    it('should_create_a_new_product_with_a_201_status_code', async () => {
        const newProduct = {
            name: 'New Product',
        };
    })
})

describe('POST /api/products', () => {
    it('should_create_a_new_product_description_and_image_with_a_201_status_code', async () => {
        const newProduct = {
            description: 'New Description',
            image: 'newimage.jpg',
        };
    })
})


it('should_handle_errors_and_respond_with_a_500_status_code', async () => {
    const error = new Error('Database error');
    Product.findByIdAndDelete = jest.fn().mockRejectedValue(error);

    const response = await request(app).delete('/api/products/invalid_id');

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ message: 'Internal Server Error' });
});

describe('GET /api/products', () => {
    it('should_return_all_products', async () => {
        const mockProducts = [
            { _id: '1', name: 'Product 1', description: 'Description 1', image: 'image1.jpg' },
            { _id: '2', name: 'Product 2', description: 'Description 2', image: 'image2.jpg' },
        ];

        Product.find = jest.fn().mockResolvedValue(mockProducts);

        const response = await request(app).get('/api/products');

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockProducts);
    });
})


it('should_handle_errors_and_respond_with_a_500_status_code', async () => {
    const error = new Error('Database error');
    Product.find = jest.fn().mockRejectedValue(error);

    const response = await request(app).get('/api/products');

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ message: error.message });
});

it('should_handle_validation_errors_and_respond_with_a_400_status_code', async () => {
    const invalidProduct = { name: '', description: '', image: '' };

    const response = await request(app).post('/api/products').send(invalidProduct);

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: 'Incomplete product data' });
});



