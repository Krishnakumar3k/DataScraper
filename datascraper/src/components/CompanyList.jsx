import * as XLSX from 'xlsx';
import './CompanyList.css';

function CompanyList({ companies, loading }) {
  const exportToExcel = () => {
    const exportData = companies.map(company => ({
      'Company Name': company.company_name,
      'Phone Number': company.phone_number,
      'Address': company.address,
      'Location': company.location,
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Companies');
/* KKK---------------------------------- */
    const colWidths = [
      { wch: 30 },
      { wch: 20 },
      { wch: 50 },
      { wch: 20 },
    ];
    worksheet['!cols'] = colWidths;

    const timestamp = new Date().toISOString().split('T')[0];
    XLSX.writeFile(workbook, `companies_${timestamp}.xlsx`);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Searching for companies...</p>
      </div>
    );
  }

  if (companies.length === 0) {
    return (
      <div className="empty-state">
        <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <h3>No companies found yet</h3>
        <p>Enter a search query and location to find companies</p>
      </div>
    );
  }
/* kkkkkkkkkkkkkkk ------------------- kkkkkkkkkk */
  return (
    <div className="company-list-container">
      <div className="list-header">
        <h2>Found {companies.length} Companies</h2>
        <button onClick={exportToExcel} className="export-button">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Export to Excel
        </button>
      </div>

      <div className="table-wrapper">
        <table className="companies-table">
          <thead>
            <tr>
              <th>Company Name</th>
              <th>Phone Number</th>
              <th>Address</th>
              <th>Location</th>
            {/*   <th>Search Query</th> */}
            </tr>
          </thead>
          <tbody>
            {companies.map((company, index) => (
              <tr key={index}>
                <td className="company-name">{company.company_name}</td>
                <td>{company.phone_number || 'N/A'}</td>
                <td>{company.address || 'N/A'}</td>
                <td>{company.location || 'N/A'}</td>
               {/*  <td>{company.search_query || 'N/A'}</td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CompanyList;
