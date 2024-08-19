import './portfolio.css'

const Portfolio = () => {
  return (
    <div className="portfolio-container">
      <table>
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Quantity</th>
            <th>Price Bought</th>
            <th>Estimation</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>AAPL</td>
            <td>100</td>
            <td>10$</td>
            <td>1000$</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Portfolio;
