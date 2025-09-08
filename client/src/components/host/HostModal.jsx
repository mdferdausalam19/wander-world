import { FiAlertCircle, FiX } from "react-icons/fi";

export default function HostModal({ isOpen, onClose, onSubmit, isSubmitting }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-6 text-white">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Become a WanderWorld Host</h2>
            <button
              onClick={onClose}
              className="text-white hover:bg-white/20 p-1 rounded-full transition-colors"
              disabled={isSubmitting}
            >
              <FiX size={24} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-start gap-4 mb-6">
            <div className="bg-emerald-100 p-3 rounded-full text-emerald-600">
              <FiAlertCircle size={24} />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Host Application</h3>
              <p className="text-sm text-gray-600 mt-1">
                By becoming a host, you'll be able to list and manage your own
                tourist spots. Your application will be reviewed by our team
                within 24-48 hours.
              </p>
            </div>
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            <div className="flex items-center gap-1">
              <input
                type="checkbox"
                id="terms"
                required
                className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
              />
              <label
                htmlFor="terms"
                className="ml-2 block text-sm text-gray-700"
              >
                I agree to the{" "}
                <span className="text-emerald-600 hover:underline">
                  Host Terms of Service
                </span>{" "}
                and
                <span className="text-emerald-600 hover:underline ml-1">
                  Privacy Policy
                </span>
              </label>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                disabled={isSubmitting}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-medium rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 flex items-center"
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Submitting...
                  </>
                ) : (
                  "Submit Application"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
