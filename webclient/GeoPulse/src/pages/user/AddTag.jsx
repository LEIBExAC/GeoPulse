import React, { useEffect, useState } from 'react';
import SidebarUser from './SidebarUser';
import "../../assets/styles/user/dashboardRightContentCommon.css";
import "../../assets/styles/user/HomeDashboard.css";
import { FaBell } from "react-icons/fa";
import { activateTag, getUserTags } from '../../assets/api/tagApi';
import { useAuthStore } from '../../assets/store/authStore';



export default function AddTag() {
  const [tagId, setTagId] = useState('');
  const [activationCode, setActivationCode] = useState('');
  const [response, setResponse] = useState(null);
  const { user } = useAuthStore()
  const [userTags, setUserTags] = useState([]);


  useEffect(() => {
    getUserTag();
  }, []); 

  const getUserTag = async () => {
    try {
      const result = await getUserTags(user._id);
      setUserTags(result);
    } catch (err) {
      console.error("Failed to fetch tags", err);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!tagId.trim() || !activationCode.trim()) return;

    try {
      const result = await activateTag({ tagId, activationCode });
      setResponse({ success: true, data: result });

      // Refresh tags after activation
      await getUserTag();

      // Clear form
      setTagId('');
      setActivationCode('');
    } catch (err) {
      setResponse({ success: false, message: err?.message || 'Activation failed' });
    }
  };

  return (
    <div className="d-flex align-items-start w-100">
      {/* Sidebar */}
      <SidebarUser />

      {/* Right Panel */}
      <div className="w-100" style={{ height: '100vh', overflowY: 'auto' }}>

        {/* Header */}
        <div className="d-flex justify-content-between align-items-center border-bottom bg-light dashboard-header pe-5"  style={{ zIndex: 1080 }}>
          <div className="fw-semibold fs-5 ms-4 text-dark">GeoPulse</div>
          <div className="position-relative dashboard-bell">
            <FaBell className="fs-5 text-dark bell-hover" />
          </div>
        </div>

        {/* Main Content */}
        <div className="dashboard-main-content ms-4 mt-4 me-4" >
          <div className="row row-cols-1 row-cols-lg-2 align-items-start g-4">            {/* Left: Activation Form */}
            <div className="col d-flex">
              <div className="card shadow-sm p-4 w-100">
                {/* Illustration */}
                <div className="text-center mb-3">
                  <img src="/images/addTagForm.png" alt="Activate Tag" style={{ width: '120px' }} />
                </div>

                {/* Title */}
                <div className="text-center mb-4">
                  <h4 className="fw-bold">🔗 Activate Your Tag</h4>
                  <p className="text-muted small mb-0">
                    Link your GeoPulse device to your account by entering the Tag ID and Activation Code found on the device or scan the QR.
                  </p>
                </div>

                {/* Scan QR */}
                <div className="text-center mb-3">
                  <button type="button" className="btn btn-outline-primary w-100" onClick={() => alert("QR Scanner Coming Soon!")}>
                    📷 Scan QR Code from Tag
                  </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="tagId" className="form-label fw-semibold">
                      Tag ID <span title="Found on the tag label">❓</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="tagId"
                      value={tagId}
                      onChange={(e) => setTagId(e.target.value)}
                      placeholder="e.g., TAG123456"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="activationCode" className="form-label fw-semibold">
                      Activation Code <span title="Provided with the tag">❓</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="activationCode"
                      value={activationCode}
                      onChange={(e) => setActivationCode(e.target.value)}
                      placeholder="e.g., ACTV7890"
                      required
                    />
                  </div>

                  <button type="submit" className="btn btn-success w-100">Activate Tag</button>
                </form>

                {/* Success/Error Message */}
                {response?.success && (
                  <div className="alert alert-success mt-4 text-center">
                    ✅ Tag <strong>{response.data.tag.tagId}</strong> activated successfully!
                  </div>
                )}
                {response?.success === false && (
                  <div className="alert alert-danger mt-4 text-center">
                    ❌ {response.message}
                  </div>
                )}
              </div>
            </div>

            {/* Right: Your Tags Table */}
            <div className="col d-flex">
              <div className="card shadow-sm p-4 w-100" style={{ zIndex: 1 }}>
                <h5 className="fw-bold mb-3">📋 Your Tags</h5>

                <div className="table-responsive">
                  <table className="table table-striped align-middle">
                    <thead className="table-light">
                      <tr>
                        <th scope="col">S.No</th>
                        <th scope="col">Tag ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {userTags.map((tag, index) => (
                        <tr key={tag._id}>
                          <td>{index + 1}</td>
                          <td>{tag.tagId}</td>
                          <td>{tag.name}</td>
                          <td>
                            <span className={`badge bg-${tag.status === 'Active' ? 'success' : 'secondary'}`}>
                              {tag.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );

}


//   <div className="d-flex align-items-start w-100">
//     {/* Sidebar */}
//     <SidebarUser />

//     {/* Right Panel */}
//     <div className="w-100" style={{ height: '100vh', overflowY: 'auto' }}>

//       {/* Header */}
//       <div className="position-sticky top-0 bg-light border-bottom dashboard-header pe-5 z-3">
//         <div className="d-flex justify-content-between align-items-center py-3 px-4">
//           <div className="fw-semibold fs-5 text-dark">GeoPulse</div>
//           <div className="position-relative dashboard-bell">
//             <FaBell className="fs-5 text-dark bell-hover" />
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="dashboard-main-content ms-4 mt-4 me-4">
//         <div className="row row-cols-1 row-cols-lg-2 align-items-stretch g-4 z-4">

//           {/* Left: Activation Form */}
//           <div className="col">
//             <div className="card shadow-sm p-4 equal-height-card">
//               {/* Illustration */}
//               <div className="text-center mb-3">
//                 <img src="/images/addTagForm.png" alt="Activate Tag" style={{ width: '120px' }} />
//               </div>

//               {/* Title */}
//               <div className="text-center mb-4">
//                 <h4 className="fw-bold">🔗 Activate Your Tag</h4>
//                 <p className="text-muted small mb-0">
//                   Link your GeoPulse device to your account by entering the Tag ID and Activation Code found on the device or scan the QR.
//                 </p>
//               </div>

//               {/* Scan QR */}
//               <div className="text-center mb-3">
//                 <button type="button" className="btn btn-outline-primary w-100" onClick={() => alert("QR Scanner Coming Soon!")}>
//                   📷 Scan QR Code from Tag
//                 </button>
//               </div>

//               {/* Form */}
//               <form onSubmit={handleSubmit} className="flex-grow-1">
//                 <div className="mb-3">
//                   <label htmlFor="tagId" className="form-label fw-semibold">
//                     Tag ID <span title="Found on the tag label">❓</span>
//                   </label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     id="tagId"
//                     value={tagId}
//                     onChange={(e) => setTagId(e.target.value)}
//                     placeholder="e.g., TAG123456"
//                     required
//                   />
//                 </div>

//                 <div className="mb-3">
//                   <label htmlFor="activationCode" className="form-label fw-semibold">
//                     Activation Code <span title="Provided with the tag">❓</span>
//                   </label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     id="activationCode"
//                     value={activationCode}
//                     onChange={(e) => setActivationCode(e.target.value)}
//                     placeholder="e.g., ACTV7890"
//                     required
//                   />
//                 </div>

//                 <button type="submit" className="btn btn-success w-100">Activate Tag</button>
//               </form>

//               {/* Success/Error Message */}
//               {response?.success && (
//                 <div className="alert alert-success mt-4 text-center">
//                   ✅ Tag <strong>{response.data.tag.tagId}</strong> activated successfully!
//                 </div>
//               )}
//               {response?.success === false && (
//                 <div className="alert alert-danger mt-4 text-center">
//                   ❌ {response.message}
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Right: Your Tags Table */}
//           <div className="col d-flex flex-column">
//             <div className="card shadow-sm p-4 h-100">
//               <h5 className="fw-bold mb-3">📋 Your Tags</h5>

//               <div className="table-responsive">
//                 <table className="table table-striped align-middle">
//                   <thead className="table-light">
//                     <tr>
//                       <th scope="col">S.No</th>
//                       <th scope="col">Tag ID</th>
//                       <th scope="col">Name</th>
//                       <th scope="col">Status</th>
//                     </tr>
//                   </thead>
//                   <tbody>{

//                     userTags.map((tag, index) => (
//                       <tr key={tag._id}>
//                         <td>{index + 1}</td>
//                         <td>{tag.tagId}</td>
//                         <td>{tag.name}</td>
//                         <td>
//                           <span className={`badge bg-${tag.status === 'Active' ? 'success' : 'secondary'}`}>
//                             {tag.status}
//                           </span>
//                         </td>
//                       </tr>
//                     ))}


//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>


//         </div>
//       </div>
//     </div>
//   </div>
// );