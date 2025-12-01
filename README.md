# The Wild Oasis

Dự án **The Wild Oasis** là một ứng dụng quản lý khách sạn (hotel management) được xây dựng nhằm thực hành các kỹ năng React, React Query, Routing, Component Architecture và State Management.

## 🚀 Mục tiêu của dự án

- Xây dựng dashboard quản lý phòng, đặt phòng, khách hàng.
- Quản lý CRUD cho cabins, bookings, guests.
- Thực hành React Query để fetch, cache và mutate dữ liệu.
- Sử dụng UI component tái sử dụng dựa trên thiết kế chuyên nghiệp.
- Tối ưu hóa performance, UX và clean code.

## 🛠 Công nghệ sử dụng

- **React** (Vite hoặc Create React App)
- **React Query (TanStack Query)**
- **React Router**
- **Styled Components / CSS Modules / Tailwind** (tuỳ chọn)
- **Supabase** (hoặc backend tùy chọn)
- **Context API** hoặc **Zustand** (nếu mở rộng state management)

## 📁 Cấu trúc thư mục dự kiến

```
The-Wild-Oasis/
├── src/
│   ├── components/
│   ├── features/
│   │   ├── cabins/
│   │   ├── bookings/
│   │   ├── guests/
│   ├── hooks/
│   ├── services/
│   ├── ui/
│   ├── utils/
│   └── App.jsx
├── public/
├── README.md
└── package.json
```

## ⚙️ Cách chạy dự án

### 1. Cài đặt phụ thuộc

```
npm install
```

### 2. Chạy môi trường development

```
npm run dev
```

### 3. Build production

```
npm run build
```

## 🔗 Backend / API

- Backend dự kiến: **Supabase** (authentication + database + storage)
- Thư mục `services/` chứa toàn bộ hàm gọi API.

## 🎯 Tiến độ phát triển

- [x] Khởi tạo project (base scaffold)
- [x] Thiết kế UI cơ bản
- [x] Tạo modules cabins
- [ ] Tạo modules bookings
- [ ] Tích hợp React Query
- [ ] Tối ưu performance

## 📄 Ghi chú

- Đây là dự án học tập, tập trung vào code clean và kiến trúc rõ ràng.
- Có thể mở rộng thành sản phẩm hoàn chỉnh trong tương lai.
