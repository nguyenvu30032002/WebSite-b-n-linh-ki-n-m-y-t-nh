import { createStore } from 'redux';   // Hàm tạo store từ Redux
import searchReducer from './Reducer'; // Import reducer

// Tạo store với reducer (searchReducer xử lý trạng thái tìm kiếm)
const store = createStore(searchReducer);

export default store;