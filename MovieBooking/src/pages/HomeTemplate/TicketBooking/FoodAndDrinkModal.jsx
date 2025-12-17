
import React, { useState } from 'react';

const foodItems = [
    { id: 1, name: 'Popcorn', price: 75000, image: '/img/Foods/popcorn.jpg' },
    { id: 2, name: 'Soft Drink', price: 50000, image: '/img/Foods/drink.jpg' },
    { id: 3, name: 'Couple Combo', price: 150000, image: '/img/Foods/combo.jpg' },
    { id: 4, name: 'Twister Orange', price: 20000, image: '/img/Foods/TwisterOrangeBottle.png' },
    { id: 5, name: 'Popcorn & Aquafina Water', price: 20000, image: '/img/Foods/PopcornAndAquafinaWater.png' },
    { id: 6, name: '4-VI-BAP', price: 59000, image: '/img/Foods/4-VI-BAP.jpg' },
    { id: 7, name: 'MixVi', price: 9000, image: '/img/Foods/4-VI-BAP.jpg' },
];

const FoodAndDrinkModal = ({ onContinue, onBack, selectedSeats, ticketPrice }) => {
    const [foodQuantities, setFoodQuantities] = useState(
        foodItems.reduce((acc, item) => {
            acc[item.id] = 0;
            return acc;
        }, {})
    );

    const handleQuantityChange = (id, delta) => {
        setFoodQuantities((prev) => ({
            ...prev,
            [id]: Math.max(0, prev[id] + delta),
        }));
    };

    const foodTotal = foodItems.reduce(
        (total, item) => total + item.price * foodQuantities[item.id],
        0
    );

    const total = ticketPrice + foodTotal;

    const handleContinue = () => {
        const selectedFoods = foodItems
            .filter((item) => foodQuantities[item.id] > 0)
            .map((item) => ({ ...item, quantity: foodQuantities[item.id] }));
        onContinue(selectedFoods);
    };  

    return (
        <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white text-red-600 rounded-lg p-6 w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4 text-center">Food & Drinks</h2>
                <div className="space-y-4 max-h-80 overflow-y-auto">
                    {foodItems.filter(i => i.id !== 7).map((item) => {
                        if (item.id === 6) {
                            const mixViItem = foodItems.find(i => i.id === 7);
                            return (
                                <div key={item.id} className="p-4 border rounded-lg">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-16 h-16 rounded-md mr-4"
                                            />
                                            <div>
                                                <h3 className="font-semibold">{item.name}</h3>
                                                <p className="text-red-500">{item.price.toLocaleString()} đ</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center">
                                            <button
                                                onClick={() => handleQuantityChange(item.id, -1)}
                                                className="bg-gray-200 px-3 py-1 rounded-full"
                                            >
                                                -
                                            </button>
                                            <span className="mx-4">{foodQuantities[item.id]}</span>
                                            <button
                                                onClick={() => handleQuantityChange(item.id, 1)}
                                                className="bg-gray-200 px-3 py-1 rounded-full"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                    {mixViItem && (
                                        <div className="mt-4 pt-4 border-t flex items-center justify-between">
                                            <div className="flex items-center">
                                                {/* Intentionally left blank to align with the item above */}
                                                <div className="w-16 h-16 rounded-md mr-4" />
                                                <div>
                                                    <h3 className="font-semibold">{mixViItem.name}</h3>
                                                    <p className="text-red-500">{mixViItem.price.toLocaleString()} đ</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center">
                                                <button
                                                    onClick={() => handleQuantityChange(mixViItem.id, -1)}
                                                    className="bg-gray-200 px-3 py-1 rounded-full"
                                                >
                                                    -
                                                </button>
                                                <span className="mx-4">{foodQuantities[mixViItem.id]}</span>
                                                <button
                                                    onClick={() => handleQuantityChange(mixViItem.id, 1)}
                                                    className="bg-gray-200 px-3 py-1 rounded-full"
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        }

                        return (
                            <div
                                key={item.id}
                                className="flex items-center justify-between p-4 border rounded-lg"
                            >
                                <div className="flex items-center">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-16 h-16 rounded-md mr-4"
                                    />
                                    <div>
                                        <h3 className="font-semibold">{item.name}</h3>
                                        <p className="text-red-500">{item.price.toLocaleString()} đ</p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <button
                                        onClick={() => handleQuantityChange(item.id, -1)}
                                        className="bg-gray-200 px-3 py-1 rounded-full"
                                    >
                                        -
                                    </button>
                                    <span className="mx-4">{foodQuantities[item.id]}</span>
                                    <button
                                        onClick={() => handleQuantityChange(item.id, 1)}
                                        className="bg-gray-200 px-3 py-1 rounded-full"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className="mt-6">
                    <div className="flex justify-between">
                        <span>Seats Selected</span>
                        <span>{ticketPrice.toLocaleString()} đ</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Food</span>
                        <span>{foodTotal.toLocaleString()} đ</span>
                    </div>
                    <div className="flex justify-between font-bold text-xl mt-2">
                        <span>Total</span>
                        <span className="text-red-500">{total.toLocaleString()} đ</span>
                    </div>
                </div>
                <div className="mt-6 flex justify-end gap-4">
                    <button
                        onClick={onBack}
                        className="bg-gray-300 px-6 py-2 rounded-lg"
                    >
                        Back
                    </button>
                    <button
                        onClick={handleContinue}
                        className="bg-red-500 text-white px-6 py-2 rounded-lg"
                    >
                        Continue
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FoodAndDrinkModal;