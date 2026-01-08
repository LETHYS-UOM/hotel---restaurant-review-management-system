import './CategoryPerformance.css';

const CategoryPerformance = () => {
  const categories = [
    { name: 'Staff', score: 85, color: '#3b82f6' },
    { name: 'Cleanliness', score: 78, color: '#3b82f6' },
    { name: 'Location', score: 92, color: '#3b82f6' },
    { name: 'Food', score: 71, color: '#3b82f6' },
  ];

  return (
    <div className="category-performance-card">
      <div className="card-header">
        <h3 className="card-title">Category Performance</h3>
      </div>

      <div className="categories-list">
        {categories.map((category) => (
          <div key={category.name} className="category-item">
            <span className="category-name">{category.name}</span>
            <div className="category-bar-wrapper">
              <div className="category-bar-bg">
                <div
                  className="category-bar-fill"
                  style={{
                    width: `${category.score}%`,
                    backgroundColor: category.color,
                  }}
                ></div>
              </div>
            </div>
            <span className="category-score">{category.score}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPerformance;
