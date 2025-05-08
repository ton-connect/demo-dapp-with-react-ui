import './style.scss';
import { useTonConnectUI, useTonWallet } from "@tonconnect/ui-react";
import { beginCell, Cell } from '@ton/ton';

// Component to test SignData functionality
export function SignDataTester() {
  const wallet = useTonWallet();
  const [tonConnectUi] = useTonConnectUI();

  // Handle text signing
  const handleTextSign = async () => {
    try {
      const result = await tonConnectUi.signData({
        type: 'text',
        text: 'I confirm this test signature request.',
      });
      console.log('Text signature result:', result);
    } catch (e) {
      console.error('Error signing text:', e);
    }
  };

  // Handle binary signing
  const handleBinarySign = async () => {
    try {
      // Example binary data (random bytes)
      const binaryData = Buffer.from('I confirm this test signature request.', 'ascii');
      const result = await tonConnectUi.signData({
        type: 'binary',
        bytes: binaryData.toString('base64'),
      });
      console.log('Binary signature result:', result);
    } catch (e) {
      console.error('Error signing binary:', e);
    }
  };

  // Handle cell signing
  const handleCellSign = async () => {
    try {
      // Create a simple cell with a message
      const text = "Test message in cell";
      const cell = beginCell()
        .storeUint(text.length, 7) // length
        .storeStringTail(text)
        .endCell();

      const result = await tonConnectUi.signData({
        type: 'cell',
        schema: 'message#_ len:uint7 {len <= 127} text:(bits len * 8) = Message;',
        cell: cell.toBoc().toString('base64'),
      });
      console.log('Cell signature result:', result);
    } catch (e) {
      console.error('Error signing cell:', e);
    }
  };

  return (
    <div className="sign-data-tester">
      <h3>Sign Data Test</h3>
      
      <div className="sign-data-tester__info">
        Test different types of data signing: text, binary, and cell formats
      </div>
      
      {wallet ? (
        <div className="sign-data-tester__buttons">
          <button onClick={handleTextSign}>
            Sign Text
          </button>
          <button onClick={handleBinarySign}>
            Sign Binary
          </button>
          <button onClick={handleCellSign}>
            Sign Cell
          </button>
        </div>
      ) : (
        <div className="sign-data-tester__error">
          Connect wallet to test signing
        </div>
      )}
    </div>
  );
} 
